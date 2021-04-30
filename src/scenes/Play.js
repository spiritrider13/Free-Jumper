// Gameplay scene

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/playBackground.png');
        this.load.image('horse', './assets/horse.png');
    }

    create() {
        // background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        // UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xf3f8e2).setOrigin(0,0);

        // add player horse
        this.p1Horse = new Horse(this, 50, 300, 'horse', 128, 80).setOrigin(0, 0);

        // instantiate obstacles
        this.obstacle1 = new Obstacle(this, 1).setOrigin(0);
        this.obstacle2 = new Obstacle(this, 2).setOrigin(0);
        this.obstacle3 = new Obstacle(this, 3).setOrigin(0);
        
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize/*height*/, '0xFFFFFF').setOrigin(0, 0);    // top
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);    // bottom
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);   // left
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);    // right

        //HUD location at top of window
        this.add.rectangle(0, 0, game.config.width, borderUISize, '0xFFFFFF').setOrigin(0);

        //hud text config
        let hudConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#00000000',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //add elapsed time and distance to scene
        this.distanceDisplay = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2 + 3, 'Distance Traveled: 0', hudConfig);

        //actual distance variable used to access distance
        this.distance = 0;

        //speed modifier for distance value interperetation
        let speedModifier = 1.0;

        //game over flag
        this.gameOver = false;
        
    }

    update(time, delta) {
        

        //updating the distance
        if(!this.gameOver){
            this.distance = Math.floor((time / 500) * this.speedModifier)
            this.distanceDisplay.text = 'Distance Traveled: ' + this.distance;
        }

    }
    
}