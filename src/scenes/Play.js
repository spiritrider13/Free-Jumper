// Gameplay scene

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/playBackground.png');
        this.load.image('defaultTexture', './assets/defaultTexture.jpg');
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
        this.obstacle1 = new Obstacle(this, 0, 'defaultTexture').setOrigin(0);
        this.obstacle2 = new Obstacle(this, 1, 'defaultTexture').setOrigin(0);
        this.obstacle3 = new Obstacle(this, 2, 'defaultTexture').setOrigin(0);
        
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

        //define space key
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //add elapsed time and distance to scene
        this.distanceDisplay = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2 + 3, 'Distance Traveled: 0', hudConfig);

        //temp spacebar text
        this.tempText = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'PRESS SPACEBAR TO START', hudConfig).setOrigin(0.5);

        //actual distance variable used to access distance
        this.distance = 0;

        //speed modifier for distance value interperetation
        this.speedModifier = 1.0;

        //game over flag
        this.gameOver = false;

        //game start flag
        this.gameStart = false;
        
    }

    update(time, delta) {
        //if space key is pressed...
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){

            //if the game hasn't started, start the game
            if(!this.gameStart){
                this.gameStart = true;
                this.tempText.text = "";
            }
            else{
                console.log("Horse Jump Triggered");
                console.log(this.speedModifier);
                this.horseJump();
            }
        }

        

        //updating the distance
        if(!this.gameOver && this.gameStart){ //if game hasnt ended and has been started
            this.distance += delta * this.speedModifier;
            this.distanceDisplay.text = 'Distance Traveled: ' + Math.floor(this.distance/250);
        }

        //speed incrementation
        var temp = this.distance / 250;
        if(temp > 50 && this.speedModifier == 1)
            this.speedModifier += 0.25;
        else if(temp > 100 && this.speedModifier == 1.25)
            this.speedModifier += 0.5;
        else if(temp > 200 && this.speedModifier == 1.75)
            this.speedModifier += 0.5;
        else if(temp > 300 && this.speedModifier == 2.25)
            this.speedModifier += 0.5;
        else if(temp > 400 && this.speedModifier == 2.75)
            this.speedModifier += 0.5;
        else if(temp > 500 && this.speedModifier == 3.25)
            this.speedModifier += 0.5;
        else if(temp > 600 && this.speedModifier == 3.75)
            this.speedModifier += 0.5;

    }

    horseJump(){
        this.p1Horse.jump();
    }
    
}