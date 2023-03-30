
import MainScene from '/jogo/src/mainScene.js';
import MenuScene from '/jogo/src/menuScene.js';
import LoadScene from '/jogo/src/loadScene.js';

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
    scene: [MenuScene, LoadScene, MainScene]
};

window.game = new Phaser.Game(config);