
import MainScene from '/src/mainScene.js';
import MenuScene from '/src/menuScene.js';
import LoadScene from '/src/loadScene.js';

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
    scene: [LoadScene, MenuScene, MainScene]
};

window.game = new Phaser.Game(config);