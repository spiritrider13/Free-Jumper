// Gameplay scene

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('playbackground', './assets/playBackground.png');
        this.load.image('obstacle0', './assets/obstacle-1.png');
        this.load.image('obstacle1', './assets/obstacle2.png');
        this.load.image('obstacle2', './assets/obstacle3.png');
        this.load.image('horse', './assets/horse.png');

        // load spritesheet
        this.load.spritesheet('horseJump', './assets/jumpAnimation.png', {frameWidth: 48, frameHeight: 48, startFrame: 0, endFrame: 8});
        this.load.spritesheet('horseRun', './assets/runAnimation.png', {frameWidth: 128, frameHeight: 78, startFrame: 0, endFrame: 8});

        this.load.audio('sfx-run', './assets/horserunning.mp3');
        this.load.audio('sfx-noise', './assets/noise.mp3');
        this.load.audio('backgroundMusic', './assets/tutorial_4.mp3');
    }

    create() {
        this.backgroundMusic = this.sound.add('backgroundMusic',{ volume: 0.5, loop: true });
        this.backgroundMusic.play();
        this.sfxRun = this.sound.add('sfx-run',{ volume: 0.8, loop: true }); 
        this.sfxNoise = this.sound.add('sfx-noise',{ volume: 0.8 });
        // background
        this.playbackground = this.add.tileSprite(0, 0, 640, 480, 'playbackground').setOrigin(0, 0);

        // UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xf3f8e2).setOrigin(0,0);

        // add player horse
        this.p1Horse = new Horse(this, 50, 350, 'horse', 128, 80).setOrigin(0);

        // instantiate obstacles
        //parameters go by (texture type, scene, x, y, default texture, frame)
        this.obstacle1 = new Obstacle(0, this, 640, 480, 'obstacle0').setOrigin(0);
        this.obstacle2 = new Obstacle(1, this, 640, 480, 'obstacle1').setOrigin(0);
        this.obstacle3 = new Obstacle(2, this, 640, 480, 'obstacle2').setOrigin(0);

        //current obstacle on screen
        this.currentObstacle = null;
        
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

        //game over flag
        this.gameOver = false;

        //game start flag
        this.gameStart = false;

        // run animation config
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('horseRun', { start: 0, end: 8, first: 0}),
            framerate: .5,
            repeat: -1
        });

        //this.p1HorseAnims = this.add.sprite(200, 200, 'horseRun').setOrigin(0);

        // jump animation config
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('horseJump', { start: 0, end: 8, first: 0}),
            framerate: 5
        });

        this.p1HorseAnims = this.add.sprite(this.p1Horse.x, this.p1Horse.y, 'horseRun').setOrigin(0);

    }

    update(time, delta) {

        //if space key is pressed...
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){

            //if the game hasn't started, start the game
            if(!this.gameStart){
                this.gameStart = true;
                this.gameOver = false;
                this.distance = 0;
                speedModifier = 1;
                this.sfxNoise.play();
                this.sfxRun.play();
                this.tempText.text = "";
                if(this.currentObstacle != null)
                    this.currentObstacle.end();
                this.beginRandom();
                //this.horseRun(this.p1Horse);
                this.p1HorseAnims.anims.play('run', true);
                this.p1Horse.visible = false;
                this.p1HorseAnims.visible = true;
            }
            // else, make the horse jump
            else{
                console.log("Horse Jump Triggered");

                //make horse immune
                this.p1Horse.immune = true;
                this.p1Horse.immuneTimer = 0;

                this.sfxRun.stop(); 
                //this.horseJump(this.p1Horse);
                this.p1HorseAnims.anims.play('jump', true).on('animationcomplete', () => {this.p1HorseAnims.anims.play('run', true)});
            }
        }

        
        
        
        //update all objects
        this.p1Horse.update(time, delta);
        //console.log(this.p1Horse.immune);
        if(this.currentObstacle != null && !this.gameOver && this.gameStart){
            this.currentObstacle.update();

            //if an obstacle falls off screen, spawn new one
            if(this.currentObstacle.x <= 0 - this.currentObstacle.width){
                this.currentObstacle.end();
                this.beginRandom();
            }
        }




        //check collisions
        if(this.currentObstacle != null && this.checkCollision(this.p1Horse, this.currentObstacle)) {
            //console.log("Horse collided with Obstacle " + this.p1Horse.immune);
            //if horse is immune, game isn't over
            if(this.p1Horse.immune == false){
                this.gameOver = true;
                this.p1Horse.visible = true;
                this.p1HorseAnims.stop();
                this.p1HorseAnims.visible = false;
            }
        }
        
        
        
        
        //updating the distance
        if(!this.gameOver && this.gameStart){ //if game hasnt ended and has been started
            this.distance += delta * speedModifier;
            this.distanceDisplay.text = 'Distance Traveled: ' + Math.floor(this.distance/100);
        }

        
        
        
        
        //if game over, stop everything
        if(this.gameOver && this.gameStart){
            this.gameStart = false;
            this.tempText.text = "PRESS SPACE TO RESTART";
            //this.menuReturn = this.add.text(game.config.width/2, game.config.height/2, 'Press RIGHT for menu', hudConfig).setOrigin(0.5);  
        }

        
        
        
        //speed incrementation
        //Every 100 meters, the horse's speedModifier increases by 0.2
        //the "toFixed(1)" method rounds to nearest tenth.
        //this is to fix floating point abiguity
        var temp = this.distance / 100;
        if(temp > 100 && speedModifier == 1)
            speedModifier += 0.2;
        else if(temp > 200 && speedModifier.toFixed(1) == 1.2)
            speedModifier += 0.2;
        else if(temp > 300 && speedModifier.toFixed(1) == 1.4)
            speedModifier += 0.2;
        else if(temp > 400 && speedModifier.toFixed(1) == 1.6)
            speedModifier += 0.2;
        else if(temp > 500 && speedModifier.toFixed(1) == 1.8)
            speedModifier += 0.2;
        else if(temp > 600 && speedModifier.toFixed(1) == 2)
            speedModifier += 0.2;
        else if(temp > 700 && speedModifier.toFixed(1) == 2.2)
            speedModifier += 0.2;
        else if(temp > 800 && speedModifier.toFixed(1) == 2.4)
            speedModifier += 0.2;
        else if(temp > 900 && speedModifier.toFixed(1) == 2.6)
            speedModifier += 0.2;
        else if(temp > 1000 && speedModifier.toFixed(1) == 2.8)
            speedModifier += 0.2;
        
        
        
        
        
        

    }









    //used for when the obstacle reaches left hand side - set inactive
    beginRandom() {

        var random = Math.floor(Math.random() * 3); //creates either 0, 1, or 3

        //the following switch block takes the previously generated random number and
        //activates the corresponding obstacle through the Play class
        switch(random){
            case 0:
                this.currentObstacle = this.obstacle1;
                this.obstacle1.begin();
                break;
            case 1:
                this.currentObstacle = this.obstacle2;
                this.obstacle2.begin();
                break;
            case 2:
                this.currentObstacle = this.obstacle3;
                this.obstacle3.begin();
                break;
            default:
                console.error("Invalid random obstacle attempted activation.");
        }
    }

    checkCollision(obstacle, horse) {  // collision function from rocket patrol
        // simple AABB checking
        if (obstacle.x < horse.x + horse.width &&
            obstacle.x + obstacle.width > horse.x &&
            obstacle.y < horse.y + horse.height &&
            obstacle.height + obstacle.y > horse.y) {
                return true;
        } else {
            return false;
        }
    }
}