
        var config = {
            type: Phaser.AUTO,
            width: 1080,
            height: 720,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update,
            }
        };

        var grav;
        var player;
        var cars;
        var gasolina;
        var timerEvent;
        var score = 0;
        var gasol = 0;
        var scoreText;
        var game = new Phaser.Game(config);
        var soundPlaying = false;

        function preload() {
            this.load.spritesheet('carroplayer', 'assets/carro1.png', { frameWidth: 169, frameHeight: 296 });
            this.load.spritesheet('carroinimigo', 'assets/carro2.png', { frameWidth: 176, frameHeight: 291 });
            this.load.spritesheet('ambuinimiga', 'assets/ambu.png', { frameWidth: 63, frameHeight: 97 });
            this.load.spritesheet('carroinimigo2', 'assets/azul.png', { frameWidth: 61, frameHeight: 88 });
            this.load.spritesheet('motainimiga', 'assets/mota1.png', { frameWidth: 30, frameHeight: 58 });
            this.load.spritesheet('gas', 'assets/gas.png', { frameWidth: 612, frameHeight: 580 });
            this.load.spritesheet('camiao', 'assets/camiao.png', { frameWidth: 120, frameHeight: 239 });
            this.load.image('estrada', 'assets/sky.png');
            this.load.audio('buzina', 'assets/buzina.wav');
            this.load.audio('acelerar', 'assets/acelerar.mp3'); 

            /********* loading bar *********/
            var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(340, 270, 350, 50);
            
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: 540,
                y: 220,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(350, 280, 320 * value, 30);
            });
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });

            this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
            });
            
            this.load.image('logo', 'assets/tuggatraffic.png');
            for (var i = 0; i < 500; i++) {
                this.load.image('Carregando modelo: ' + i, 'tugatraffic.png');
            }
            
            /********* loading bar *********/    
            
        }

        function create ()
        {   
            this.add.image(400, 300, 'logo');
            /*TENTEI 
            this.time.addEvent({
                delay: 5000,
                callback: ()=>{
                    this.add.image(400, 300, 'logo');
                },
                loop: true,
            })
            */
            
            // Adicionar o fundo do jogo
            this.add.image(540, 360, 'estrada');

            // Adicionar o carro do jogador
            player = this.physics.add.sprite(560, 690, 'carroplayer');
            player.setCollideWorldBounds(true);
            player.setScale(0.275);
            
            // Adicionar os carros inimigos
            cars = this.physics.add.group();
            gasolina = this.physics.add.group();
            
            // Adicionar o texto da pontuação
            scoreText = this.add.text(985, 10, 'score: 0', { fontSize: '20px Calibri bold', fill: 'rgb(0, 51, 102)'});
            gas = this.add.text(985, 680, 'gasolina: 0', { fontSize: '20px Calibri bold', fill: 'rgb(0, 51, 102)'});
            // Adicionar as teclas de controle
            cursors = this.input.keyboard.createCursorKeys();
            

            // Adicionar o evento de tempo para criar novos carros aleatoriamente
            timerEvent = this.time.addEvent({
                delay: 1000,
                callback: EventoCarro1,
                callbackScope: this,
                loop: true
            });

            timerEvent2 = this.time.addEvent({
                delay: 1200,
                callback: EventoCarro2,
                callbackScope: this,
                loop: true
            });

            timerEvent3 = this.time.addEvent({
                delay: 1500,
                callback: EventoCarro3,
                callbackScope: this,
                loop: true
            });

            scoreEvent = this.time.addEvent({
                delay: 500,
                callback: EventoScore,
                callbackScope: this,
                loop: true
            });

            VelocidadeEvent = this.time.addEvent({
                delay: 1500,
                callback: EventoVelo,
                callbackScope: this,
                loop: true
            });

            GasEvent = this.time.addEvent({
                delay: 15000,
                callback: EventoGas,
                callbackScope: this,
                loop: true
            });
        
        }

        function update ()
        {

            player.body.allowGravity = false;
            // Movimentar o carro do jogador com as teclas de controle
            if (cursors.up.isDown) {
                player.setVelocityY(-300)
                if(soundPlaying == false){
                    this.music = this.sound.add('acelerar', { loop: false });
                    this.music.play();
                    soundPlaying = true;
                }
            
            } else if (cursors.down.isDown) {
                player.setVelocityY(150)
            } else if (cursors.right.isDown) {
                player.setVelocityX(225)
            } else if (cursors.left.isDown) {
                player.setVelocityX(-225)
            } else {
                player.setVelocityY(-50);
                player.setVelocityX(0);
                soundPlaying = false;
            }

            if (cursors.space.isDown){
                this.music = this.sound.add('buzina', { loop: false });
                this.music.play();
            }

            if (player.x < 200) {
                player.x = 200;
            } else if (player.x > 900) {
                player.x = 900;
            }
            // Verificar colisões entre o carro do jogador e os carros inimigos
            this.physics.add.collider(player, cars, gameOver, null, this);
            
            // Atualizar a pontuação
            scoreText.setText('Km: ' + score.toFixed(1));
            gas.setText('Gas: ' + gasol)
            // Acelerar os carros inimigos à medida que o jogo avança
            cars.children.iterate(function (child) {
                child.setVelocityY(200 + (score / 10));
            
            });
              
            
        }

        function createCar() {

            // Escolher uma via aleatória para adicionar o carro inimigo
            var transito = Phaser.Math.Between(1, 6);
            if (transito != 1){
                var lane=Phaser.Math.Between(1,6)
                    
                var c = Phaser.Math.Between(1, 14);
                var y;
                //252 360 486 612 738 846
                switch (lane){
                    case 1:
                        y=250;  
                        break;
                    case 2:
                        y=370;
                        break;
                    case 3:
                        y=500;
                        break;
                    case 4:
                        y=620;
                        break;
                    case 5:
                        y=750;
                        break;
                    case 6:
                        y=870;
                        break;
                    
                }
                
                //Mudar a posição dos carros na lane
                var lane2 = Phaser.Math.Between(1, 3);
                var y2;
                switch(lane2){
                    case 1:
                        y2 = 15;
                        break;
                    case 2:
                        y2 = 0;
                        break;
                    case 3:
                        y2 = -15;
                        break;
                }

                // Verificar se há um carro já ocupando o local onde o novo carro será gerado

                var v;
                // Adicionar o carro inimigo na posição aleatória
                if (c==1){
                    car = cars.create(y+y2, 0, 'ambuinimiga');
                    car.setScale(0.875);
                } else if (c>1 && c<6) {
                    car = cars.create(y+y2, 0, 'carroinimigo');
                    car.setScale(0.275);
                } else if (c>=6 && c<11){
                    car = cars.create(y+y2, 0, 'carroinimigo2');
                    car.setScale(0.9);
                }else if (c>=11 && c<13){
                    car = cars.create(y+y2, 0, 'motainimiga');
                    car.setScale(0.8);
                }else{
                    car = cars.create(y+y2, 0, 'camiao');
                    car.setScale(0.7);
                }
                car.setCollideWorldBounds(true);
                car.setBounce(1);
                car.setCollideWorldBounds(false);
            }
            
        }

        function EventoCarro1 (){
            createCar();
            if(score > 60){
                timerEvent.delay == 500;
            }
            else{
                timerEvent.delay = timerEvent.delay - 0.1;
            }
        }
        function EventoCarro2 (){
            if (score > 2){
                createCar();
                timerEvent2.delay = 1200
            } else if (score > 20){
                timerEvent2 = timerEvent2.delay - 0.1;
            }                
        }

        function EventoCarro3 (){
            if (score > 20){
                createCar();
                timerEvent3.delay = 1500
            } else if (score > 50){
                timerEvent3 = timerEvent3.delay - 0.1;
            }                
        }

        function EventoScore() {
            score += 0.1;
            // Converte a pontuação para um inteiro antes de verificar o múltiplo de 2
            var scoreInt = Math.floor(score);
            if (scoreInt % 2 === 0 && scoreInt !== 0) {
            scoreEvent.delay -= scoreEvent.delay * 0.005;
            }
        }
        
        function EventoVelo(){
            var scoreInt = Math.floor(score);
            if (scoreInt%5 === 0 && scoreInt!== 0) {
                this.physics.world.gravity.y += 500;
            };
        }

        function EventoGas(){
            var lane = Phaser.Math.Between(1, 6);

            var y;
            //252 360 486 612 738 846
            switch (lane){
                case 1:
                    y=250;  
                    break;
                case 2:
                    y=370;
                    break;
                case 3:
                    y=500;
                    break;
                case 4:
                    y=620;
                    break;
                case 5:
                    y=750;
                    break;
                case 6:
                    y=870;
                    break;
            }
            g = gasolina.create(y, 0, 'gas');
            g.setVelocityY(50);
            g.setScale(0.1);
            g.setCollideWorldBounds(true);
            g.setBounce(1);
            g.setCollideWorldBounds(false);


            var dl= Phaser.Math.Between(6500,16500);
            GasEvent.delay = dl;

        }
        
        function VerificaLane (lane){
            if(ordemlane[0]==lane||ordemlane[1]==lane){
                return false;
            }
            ordemlane[2]=ordemlane[1];
            ordemlane[1]=ordemlane[0];
            ordemlane[0]=lane;
            return true;
        }

            function gameOver() {
            // Parar o evento de tempo
            timerEvent.remove(false);
            // Mostrar a mensagem de fim de jogo
            var gameOverText = this.add.text(400, 300, 'Game Over\nFinal Score: ' + score, { fontSize: '64px', fill: '#000' });
            gameOverText.setOrigin(0.5);

            // Parar a movimentação dos carros
            cars.setVelocityY(0);

            // Parar a animação dos carros
            cars.children.iterate(function (child) {
                child.anims.stop();
            });

            // Desativar o movimento do carro do jogador
            player.setVelocityX(0);

            // Desativar as teclas de controle
            cursors.left.destroy();
            cursors.right.destroy();
        }