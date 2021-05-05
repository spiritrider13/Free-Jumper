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
        /*this.backgroundMusic = this.sound.add('backgroundMusic',{ volume: 0.5, loop: true });
        this.backgroundMusic.play();*/
        // background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);    

        // show menu text
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'CONTROLS', Menu.menuConfig).setOrigin(0.5);
        this.add.text(560, 440, 'GO BACK', Menu.menuConfig).setOrigin(0,0);  
        //this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press SPACE to jump', Menu.menuConfig).setOrigin(0.5);

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