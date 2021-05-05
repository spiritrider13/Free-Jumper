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
            fontSize: '30px',
            //backgroundColor: '#f3f8e2', 
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
        this.add.text(game.config.width/2, game.config.height/6 - borderUISize - borderPadding, 'CREDITS', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'TEAM AJS', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '26px'
        this.add.text(game.config.width/2, game.config.height/4, 'Programming', menuConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, game.config.height/2.1, 'Art & Design', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.53, 'Music & Sound', menuConfig).setOrigin(0.5);        this.add.text(530, 440, '<- GO BACK', Menu.menuConfig).setOrigin(0,0);  
        
        menuConfig.fontSize = '20px'

        // Programming
        this.add.text(game.config.width/2, game.config.height/3.25, 'Aria Altenburg', menuConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, game.config.height/2.85, 'Jason Lee', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.53, 'Sam Vik', menuConfig).setOrigin(0.5);        this.add.text(530, 440, '<- GO BACK', Menu.menuConfig).setOrigin(0,0);  

        // Art & Design
        this.add.text(game.config.width/2, game.config.height/1.9, 'Aria Altenburg', menuConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, game.config.height/1.75, 'Jason Lee', menuConfig).setOrigin(0.5);

        // Music & Sound
        this.add.text(game.config.width/2, game.config.height/1.41, 'Jason Lee', menuConfig).setOrigin(0.5);

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