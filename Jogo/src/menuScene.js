export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({key : 'menu'});
    }

    create() {

        
        const logo = this.add.image(540, 360, 'logo');
        logo.setDepth(1);
        

        this.scene.start('main');
    }

}