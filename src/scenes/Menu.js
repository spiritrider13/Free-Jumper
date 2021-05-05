// Main menu

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // menu images
        this.load.image('farm', './assets/menu.png');
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#f3f8e2', // orange
            color: '#000000',   // orange text color
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }   

        // display menu background
        this.farm = this.add.tileSprite(0, 0, 640, 480, 'farm').setOrigin(0, 0);

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2.75 - borderUISize - borderPadding, 'ENDLESS RIDER', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.3, 'Press RIGHT for controls', menuConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, game.config.height/2.3 + borderUISize + borderPadding, 'Press LEFT for credits', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.75 + borderUISize + borderPadding, 'Press SPACE to play', menuConfig).setOrigin(0.5);

        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('creditsScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('controlsScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
    }
}
