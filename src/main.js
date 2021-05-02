// Project info included in README.md

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x:0,
                y:0
            }
        }
    },
    scene: [ Menu, Controls, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//a modifying double that speeds up obstacles and the distance over time
let speedModifier = 1;

// reserve keyboard variables
let keySPACE, keyLEFT, keyRIGHT;