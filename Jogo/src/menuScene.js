export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({key : 'menu'});
    }

    spaceKey;

    preload(){ 
        this.load.image('logo', 'assets/tugatraffic.png');
    }

    create() {


        const logo = this.add.image(540, 320, 'logo');
        this.texto();
        //logo.setDepth(1);
        this.startGame();
        this.spaceKey = this.input.keyboard.addKey('SPACE');

        //this.scene.start('load');
    }

    update(){
        
        if(spaceKey.isDown){
            this.scene.start('load');
        }
        
    }

    texto(){
        const pressStart = this.add.text(315, 490, 'Press SPACE to start playing' , { 
            fontSize: '35px', 
            fontFamily: 'Georgia',
            fill: '#FFFFFF',
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
    }

    /*NÃO FUNCIONA AINDA
    startGame() {
        let x;
        x.setInteractive();
        x = this.input.keyboard.on('keydown-SPACE', function() {this.scene.start('load')}, this);
    }*/
}