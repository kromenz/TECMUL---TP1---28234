export default class LoadScene extends Phaser.Scene {
    constructor() {
        super({key : 'load'});
    }

    preload() {
        this.load.spritesheet('carroplayer', 'assets/carro1.png', { frameWidth: 169, frameHeight: 296 });
        this.load.spritesheet('carroinimigo', 'assets/carro2.png', { frameWidth: 176, frameHeight: 291 });
        this.load.spritesheet('ambuinimiga', 'assets/ambu.png', { frameWidth: 63, frameHeight: 97 });
        this.load.spritesheet('carroinimigo2', 'assets/azul.png', { frameWidth: 61, frameHeight: 88 });
        this.load.spritesheet('motainimiga', 'assets/mota1.png', { frameWidth: 30, frameHeight: 58 });
        this.load.spritesheet('gas', 'assets/gas.png', { frameWidth: 612, frameHeight: 580 });
        this.load.spritesheet('camiao', 'assets/camiao.png', { frameWidth: 120, frameHeight: 239 });
        this.load.image('estrada', 'assets/sky.png');
        this.load.image('button', 'assets/spacebar.png');
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
        
        this.load.image('logo', 'assets/tugatraffic.png');
        for (var i = 0; i < 500; i++) {
            this.load.image('Carregando modelo: ' + i, 'assets/tugatraffic.png');
        } 
        /********* loading bar *********/
    }

    create() {
        this.scene.start('menu');
    }
}