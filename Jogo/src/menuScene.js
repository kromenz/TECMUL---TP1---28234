export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({key : 'menu'});
    }

    cursor;
    spaceKey;

    preload(){ 
        this.load.image('logo', 'assets/tugatraffic.png');
    }

    create() {

        this.cursor = this.input.keyboard.createCursorKeys(); 
        const logo = this.add.image(540, 320, 'logo');
        this.texto();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
    }

    update(){
        if(this.spaceKey.isDown ){
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
}