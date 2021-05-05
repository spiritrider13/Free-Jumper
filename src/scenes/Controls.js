// Controls menu scene

class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
    }

    preload() {
        // load images
        this.load.image('controlbackground', './assets/controlMenu.png'); 
    }

    create() {
        // background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'controlbackground').setOrigin(0, 0);    

        // show menu text
        this.add.text(560, 440, 'GO BACK', Menu.menuConfig).setOrigin(0,0);  

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