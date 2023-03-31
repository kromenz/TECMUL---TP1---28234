export default class MainScene extends Phaser.Scene{
    player;
    cars;
    barrilGas;
    gasText;
    timerEvent;
    timerEvent2;
    timerEvent3;
    score
    gasol
    scoreText;
    soundPlaying = false;
    gameOvar = false;
    keyReload;
    mKey;
    nKey;
    verificalane = [3,4] 
    collideCheat
    godLikeText;
    godLikeRoad;
    road;
    collisionPlayerCars
    collisionPlayerGas

    constructor(){
        super({key : 'main'});
    }

    create(){
        //RESETAR VARIÁVEIS DEPOIS DO GAMEOVER
        this.score = 0;
        this.gasol = 0;
        this.gameOvar = false;
        this.collideCheat = 2;

        this.godLikeText = this.add.text(320, 60, 'ESTÁS IMPARÁVEL\nGOD MODE ON' , { 
            fontSize: '49px Georgia', 
            fill: '#ffa500',
            align: 'center',
            borderColor: '#fff',
            borderWidth: 10,
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            },
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            shadowColor: '#FFF',
            shadowBlur: 5
        });
        this.godLikeText.setVisible(false).setDepth(1)
        
        // Adicionar o fundo do jogo
        this.road = this.add.image(540, 360, 'estrada');
        //FUNDO ALTERNATIVO
        /* this.godLikeRoad = this.add.image(540, 360, 'estradaGOD');
        this.godLikeRoad.setVisible(false); */

        // Adicionar o carro do jogador
        this.player = this.physics.add.sprite(560, 690, 'carroplayer');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.275);
        
        // criar o grupo dos carros inimigos
        this.cars = this.physics.add.group();
               
        // Adicionar o texto da pontuação
        this.scoreText = this.add.text(985, 10, 'score: 0', { fontSize: '20px Calibri bold', fill: 'rgb(0, 51, 102)'});
        this.gasText = this.add.text(985, 680, 'fuel: 0', { fontSize: '20px Calibri bold', fill: 'rgb(0, 51, 102)'});
        // Adicionar as teclas de controle
        this.cursors = this.input.keyboard.createCursorKeys();
        this.mKey = this.input.keyboard.addKey('M');
        this.nKey = this.input.keyboard.addKey('N');
        this.bKey = this.input.keyboard.addKey('B');


        this.collisionPlayerCars = this.physics.add.collider(this.player, this.cars, this.gameOver, null, this);
        this.collisionPlayerGas = this.physics.add.collider(this.player, this.barrilGas, this.adicionaGas, null, this);
        // Adicionar o evento de tempo para criar novos carros aleatoriamente
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.EventoCarro1,
            callbackScope: this,
            loop: true
        });

        this.timerEvent2 = this.time.addEvent({
            delay: 1200,
            callback: this.EventoCarro2,
            callbackScope: this,
            loop: true
        });

        this.timerEvent3 = this.time.addEvent({
            delay: 1500,
            callback: this.EventoCarro3,
            callbackScope: this,
            loop: true
        });

        this.scoreEvent = this.time.addEvent({
            delay: 500,
            callback: this.Eventoscore,
            callbackScope: this,
            loop: true
        });

        this.VelocidadeEvent = this.time.addEvent({
            delay: 1500,
            callback: this.EventoVelo,
            callbackScope: this,
            loop: true
        });

        this.GasEvent = this.time.addEvent({
            delay: 15000,
            callback: this.EventoGas,
            callbackScope: this,
            loop: true
        });

        this.gasol = 100;
    }

    update (){

        if(this.gameOvar){  
            return;
        }

        //GASOLINA
        if (this.cursors.up.isDown){
            this.gasol -= 0.05;
        }
        else{
            this.gasol -= 0.031;
        }
        if(this.collisionPlayerGas){
            
        }
        //GAME OVER DA GASOLINA
        if(this.gasol <= 0){
            var marcelo = `Ficaste sem gota, burro\nSó fizeste: ${this.score.toFixed(2)} Km \nCarrega no botão e tem uma surpresa`
            this.gameOver2(marcelo);
        }

        if (this.mKey.isDown) {
            this.gasol = 100;
            this.gasText.setText('Fuel: ' + this.gasol);
        }

        if (this.nKey.isDown) {
            if(this.collideCheat != -1) {
                this.collideCheat = -1
                this.collisionPlayerCars?.destroy();
                console.log(this.collideCheat)
                /* this.godLikeRoad.setVisible(true) */
                this.godLikeText.setVisible(true)
            }  
        }
        
        if (this.bKey.isDown) {
            if(this.collideCheat != 2) {
                this.collideCheat = 2;
                this.collisionPlayerCars = this.physics.add.collider(this.player, this.cars, this.gameOver, null, this);
                /* this.godLikeRoad.setVisible(false) */
                this.godLikeText.setVisible(false)    
            }
        }

        this.player.body.allowGravity = false;
        // Movimentar o carro do jogador com as teclas de controle
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-300)
            if(this.soundPlaying == false){
                this.music = this.sound.add('acelerar', { loop: false });
                this.music.play();
                this.soundPlaying = true;
            }
        
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(150)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(225)
        } else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-225)
        } else {
            this.player.setVelocityY(-50);
            this.player.setVelocityX(0);
            this.soundPlaying = false;
        }

        if (this.cursors.space.isDown){
            this.music = this.sound.add('buzina', { loop: false });
            this.music.play();
        }

        if (this.player.x < 200) {
            this.player.x = 200;
        } else if (this.player.x > 900) {
            this.player.x = 900;
        }
        
        // Atualizar a pontuação
        this.scoreText.setText('Km: ' + this.score.toFixed(1));
        this.gasText.setText('Fuel: ' + this.gasol.toFixed())
        // Acelerar os carros inimigos à medida que o jogo avança
        this.cars.getChildren().forEach((child) => {
            child.setVelocityY(200 + (this.score / 10));
        })
    }

    EventoDeTempo(del, evento){ //EM PROGRESSO
        this.time.addEvent({
            delay: del,
            callback: evento,
            callbackScope: this,
            loop: true
        });
    }

    createCar() {

        // Escolher uma via aleatória para adicionar o carro inimigo
        let transito = Phaser.Math.Between(1, 6);
        if (transito != 1){
            
            let lane = Phaser.Math.Between(1,6)  
            while (lane == this.verificalane[this.verificalane.length-1]){
                lane = Phaser.Math.Between(1,6);
            }
            this.verificalane.push(lane);
            let c = Phaser.Math.Between(1, 14);
            let y;
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
            let lane2 = Phaser.Math.Between(1, 3);
            let y2;
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

            // Adicionar o carro inimigo na posição aleatória
            if (c==1){
                this.car = this.cars.create(y+y2, 0, 'ambuinimiga');

                this.anims.create({
                    key: 'sirene',
                    frames: this.anims.generateFrameNumbers('ambuinimiga', { start: 0, end: 3 }),
                    frameRate: 10,
                    repeat: -1
                });

                this.car.anims.play('sirene', true);


                this.car.setScale(0.875);
            } else if (c>1 && c<6) {
                this.car = this.cars.create(y+y2, 0, 'carroinimigo');
                this.car.setScale(0.275);
            } else if (c>=6 && c<11){
                this.car = this.cars.create(y+y2, 0, 'carroinimigo2');
                this.car.setScale(0.9);
            }else if (c>=11 && c<13){
                this.car = this.cars.create(y+y2, 0, 'motainimiga');
                this.car.setScale(0.8);
            }else{
                this.car = this.cars.create(y+y2, 0, 'camiao');
                this.car.setScale(0.7);
            }
            this.car.setCollideWorldBounds(true);
            this.car.setBounce(1);
            this.car.setCollideWorldBounds(false);
        }
        
    }

    EventoCarro1 (){
        this.createCar();
        if(this.score > 60){
            this.timerEvent.delay == 500;
        }
        else{
            this.timerEvent.delay = this.timerEvent.delay - 0.1;
        }
    }
    EventoCarro2 (){
        if (this.score > 2){
            this.createCar();
            this.timerEvent2.delay = 1200
        } else if (this.score > 20){
            this.timerEvent2 = this.timerEvent2.delay - 0.1;
        }                
    }

    EventoCarro3 (){
        if (this.score > 20){
            this.createCar();
            this.timerEvent3.delay = 1500
        } else if (this.score > 50){
            this.timerEvent3 = this.timerEvent3.delay - 0.1;
        }                
    }

    Eventoscore() {
        this.score += 0.1;
        // Converte a pontuação para um inteiro antes de verificar o múltiplo de 2
        let scoreInt = Math.floor(this.score);
        if (this.scoreInt % 2 === 0 && this.scoreInt !== 0) {
        this.scoreEvent.delay -= this.scoreEvent.delay * 0.005;
        }
    }
    
    EventoVelo(){
        let scoreInt = Math.floor(this.score);
        if (this.scoreInt%2.5 === 0 && this.scoreInt!== 0) {
            this.physics.world.gravity.y += 750;
        };
    }

    EventoGas(){
        let lane = Phaser.Math.Between(1, 6);

        let y;
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
        
        this.barrilGas = this.physics.add.sprite(y, 0, 'gas');
        this.barrilGas.setVelocityY(50);
        this.barrilGas.setScale(0.1);
        this.barrilGas.setCollideWorldBounds(true);
        this.barrilGas.setBounce(1);
        this.barrilGas.setCollideWorldBounds(false);


        let dl= Phaser.Math.Between(5000,13500);
        this.GasEvent.delay = dl;

    }
    
    VerificaLane (lane){
        if(ordemlane[0]==lane||ordemlane[1]==lane){
            return false;
        }
        ordemlane[2]=ordemlane[1];
        ordemlane[1]=ordemlane[0];
        ordemlane[0]=lane;
        return true;
    }

    adicionaGas(player, gas) {
        gas.destroy()
        if(this.gasol >= 60){
            this.gasol = 100;
        }
        else{
            this.gasol += 40;
        }
    }

    gameOver() {
        var marcelo = `BATESTES PA\nSó fizeste: ${this.score.toFixed(2)} Km \nCarrega no botão e tem uma surpresa`;
        this.gameOver2(marcelo);    
    }

    gameOver2(text = '') {
        this.gameOvar = true;

        // Mostrar a mensagem de fim de jogo
        const gameOverText = this.add.text(170, 160, text , { 
            fontSize: '49px Georgia', 
            fill: '#ffa500',
            align: 'center',
            borderColor: '#fff',
            borderWidth: 10,
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            },
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            shadowColor: '#FFF',
            shadowBlur: 5
        });

        this.timerEvent.remove(false);
        this.timerEvent2.remove(false);
        this.timerEvent3.remove(false);
        this.scoreEvent.remove(false);
        this.GasEvent.remove(false);

        // Parar a movimentação dos carros
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.cars.setVelocityY(0);
        this.cars.setVelocityX(0);
        this.timerEvent.remove(false);
        this.timerEvent2.remove(false);
        this.timerEvent3.remove(false);
        this.scoreEvent.remove(false);
        this.GasEvent.remove(false);

        const botao = this.add.image(550, 690, 'button');
        botao.setScale(0.5)
        botao.setInteractive();

        //Está a funcionar, mas só se clicar no botão, e reinicia o jogo na totalidade....
        botao.on('pointerup', function (event) { this.scene.start('load');}, this);
    }
}