// Gameplay scene

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/playBackground.png');
        this.load.image('obstacle0', './assets/obstacle-1.png');
        this.load.image('obstacle1', './assets/obstacle2.png');
        this.load.image('obstacle2', './assets/obstacle3.png');
        this.load.image('horse', './assets/horse.png');

        // load spritesheet
        this.load.spritesheet('horseJump', './assets/jumpAnimation.png', {frameWidth: 48, frameHeight: 48, startFrame: 0, endFrame: 8});
        this.load.spritesheet('horseRun', './assets/runAnimation.png', {frameWidth: 112, frameHeight: 78, startFrame: 0, endFrame: 2});
    }

    create() {
        // background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        // UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xf3f8e2).setOrigin(0,0);

        // add player horse
        this.p1Horse = new Horse(this, 50, 300, 'horse', 128, 80).setOrigin(0, 0);

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
            frames: this.anims.generateFrameNumbers('horseRun', { start: 0, end: 2, first: 0}),
            framerate: 1,
            repeat: -1
        });

        // jump animation config
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('horseJump', { start: 0, end: 8, first: 0}),
            framerate: 5
        });
        
    }

    update(time, delta) {
        this.p1Horse.alpha = 0;

        //if space key is pressed...
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){

            //if the game hasn't started, start the game
            if(!this.gameStart){
                this.gameStart = true;
                this.tempText.text = "";
                this.beginRandom();
            }
            // else, make the horse jump
            else{
                console.log("Horse Jump Triggered");
                console.log(speedModifier);
                this.horseJump(this.p1Horse);
            }
        }

        // Running animation
        if(!this.gameOver){
            this.p1Horse.alpha = 0;
            let run = this.add.sprite(this.p1Horse.x, this.p1Horse.y, 'horseRun').setOrigin(0, 0); 
            run.anims.play('run');             // play jump animation
            run.on('animationcomplete', () => {    // callback after anim completes
                //horse.reset();                       // reset horse position
                //horse.alpha = 1;                     // make horse visible again
                run.destroy();                     // remove jump sprite
            });
        }

        //update all objects
        this.p1Horse.update();
        if(this.currentObstacle != null){
            this.currentObstacle.update();
            if(this.currentObstacle.x <= 0 - this.currentObstacle.width){
                this.currentObstacle.end();
                this.beginRandom();
            }
        }
        
        //updating the distance
        if(!this.gameOver && this.gameStart){ //if game hasnt ended and has been started
            this.distance += delta * speedModifier;
            this.distanceDisplay.text = 'Distance Traveled: ' + Math.floor(this.distance/100);
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
        
        //check collisions
        if(this.checkCollision(this.p1Horse, this.obstacle1)) {
            this.gameOver = true;
        }
        if(this.checkCollision(this.p1Horse, this.obstacle2)) {
            this.gameOver = true;
        }
        if(this.checkCollision(this.p1Horse, this.obstacle3)) {
            this.gameOver = true;
        }
    }

    horseJump(horse){
        // temporarily hide horse
        horse.alpha = 0;

        // play jump animation at horse's position
        let jump = this.add.sprite(horse.x, horse.y, 'horseJump').setOrigin(0, 0); 
        jump.anims.play('jump');             // play jump animation
        jump.on('animationcomplete', () => {    // callback after anim completes
            horse.alpha = 1;                     // make horse visible again
            jump.destroy();                     // remove jump sprite
        });
        
        //this.sound.play("sfx_jump");
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