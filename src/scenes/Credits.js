// Credits menu scene

class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        // load images
        this.load.image('background', './assets/playBackground.png'); 
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#f3f8e2', 
            color: '#000000',   
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }   

        // background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0);    

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2.75 - borderUISize - borderPadding, 'ENDLESS RIDER', this.menuConfig).setOrigin(0.5);
        this.add.text(530, 440, '<- GO BACK', Menu.menuConfig).setOrigin(0,0);  

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        // if left arrow pressed, return to menu
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene');
        }
    }
}