 
    
export default class MainScene extends Phaser.Scene{
    player;
    cars;
    gasolina;
    gasText;
    timerEvent;
    timerEvent2;
    timerEvent3;
    score = 0;
    gasol = 0;
    scoreText;
    soundPlaying = false;
    gameOvar = false;
    
    constructor(){
        super({key : 'main'});
    }

    create(){
        // Adicionar o fundo do jogo
        this.add.image(540, 360, 'estrada');

        // Adicionar o carro do jogador
        this.player = this.physics.add.sprite(560, 690, 'carroplayer');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.275);
        
        // Adicionar os carros inimigos
        this.cars = this.physics.add.group();
        this.gasolina = this.physics.add.group();
        
        // Adicionar o texto da pontuação
        this.scoreText = this.add.text(985, 10, 'score: 0', { fontSize: '20px Calibri bold', fill: 'rgb(0, 51, 102)'});
        this.gasText = this.add.text(985, 680, 'gasolina: 0', { fontSize: '20px Calibri bold', fill: 'rgb(0, 51, 102)'});
        // Adicionar as teclas de controle
        this.cursors = this.input.keyboard.createCursorKeys();
        

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
    }

    update (){
        if(this.gameOvar){
            return;
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
        // Verificar colisões entre o carro do jogador e os carros inimigos
        this.physics.add.collider(this.player, this.cars, this.gameOver, null, this);
        
        // Atualizar a pontuação
        this.scoreText.setText('Km: ' + this.score.toFixed(1));
        this.gasText.setText('Gas: ' + this.gasol)
        // Acelerar os carros inimigos à medida que o jogo avança
        this.cars.getChildren().forEach((child) => {
            child.setVelocityY(200 + (this.score / 10));
        })
    }

    createCar() {

        // Escolher uma via aleatória para adicionar o carro inimigo
        let transito = Phaser.Math.Between(1, 6);
        if (transito != 1){

            let lane = Phaser.Math.Between(1,6)  
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
        if (this.scoreInt%5 === 0 && this.scoreInt!== 0) {
            this.physics.world.gravity.y += 500;
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
        
        const g = this.gasolina.create(y, 0, 'gas');
        g.setVelocityY(50);
        g.setScale(0.1);
        g.setCollideWorldBounds(true);
        g.setBounce(1);
        g.setCollideWorldBounds(false);


        let dl= Phaser.Math.Between(6500,16500);
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

    gameOver() {
        this.gameOvar = true;

        // Mostrar a mensagem de fim de jogo
        const gameOverText = this.add.text(220, 160, 'Game Over\nFinal this.score: '+ this.score.toFixed(2) + '\nPress space to restart the game' , { 
            fontSize: '55px Georgia', 
            fill: '#000',
            align: 'center',
            borderColor: '#fff',
            borderWidth: 5,
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            },
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            shadowColor: '#000',
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
        this.timerEvent.remove(false);
        this.timerEvent2.remove(false);
        this.timerEvent3.remove(false);
        this.scoreEvent.remove(false);
        this.GasEvent.remove(false);

        const botao = this.add.image(550, 690, 'button');
        botao.setScale(0.5)
        botao.setInteractive();

        
        //Está a funcionar, mas dá reload ao jogo todo, e o objetivo é a apenas esta cena
        botao.on('pointerup', function (event) { window.location.reload();}, this);
        //ESTE NÃO FUNCIONA
        //this.input.keyboard.on('keydown-SPACE', function (event) {window.location.reload()}, this);

        /* RESETAR AS VARIÁVEIS PORQUE SENÃO LEVAR RESET NÃO FUNCIONA
        if(botao.on('pointerup', function (event) {this.scene.restart()}, this)){
            this.resetVars();
        }
        */
    }
}