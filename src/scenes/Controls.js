// Controls menu

class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
    }

    preload() {
        // load images
        this.load.image('background', './assets/controlMenu.png'); 
    }

    create() {
        // background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);    

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'CONTROLS', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press RIGHT to return to Menu', menuConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press SPACE to jump', menuConfig).setOrigin(0.5);

        // define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        // if right arrow pressed, return to menu
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('menuScene');
        }
    }
    
}