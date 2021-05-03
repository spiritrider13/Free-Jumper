// Main menu

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // menu images
        this.load.image('farm', './assets/menu.png');
        this.load.image('horse', './assets/horse.png');

        // game audio
        //this.load.audio('backgroundMusic', './assets/tutorial_4.mp3');
        //this.load.audio('sfx_gallop', './assets/horserunning.mp3'); 
    }

    create() {
        //this.backgroundMusic = this.sound.add('backgroundMusic',{ volume: 0.5, loop: true });
        //this.backgroundMusic.play();
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#f3f8e2', // orange
            color: '#843605',   // orange text color
            align: 'right',
            /*padding: {
                top: 5,
                bottom: 5,
            },*/
            fixedWidth: 0
        }   

        // display menu background
        this.farm = this.add.tileSprite(0, 0, 640, 480, 'farm').setOrigin(0, 0);

        // display horse
        this.horse = this.add.tileSprite(50, 300, 128, 80, 'horse').setOrigin(0, 0);

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ENDLESS RIDER', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press RIGHT for controls', menuConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press LEFT to play', menuConfig).setOrigin(0.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //this.backgroundMusic.stop();
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //this.backgroundMusic.stop();
            this.scene.start('controlsScene');
        }
    }
}
