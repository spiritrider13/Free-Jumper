// Obstacle prefab
class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, type, frame) {

        this.active = false; //whether the obstacle is activeon the screen

        if(type == 0){ //mud puddle
            this.texture = "";
        }
        else if(type == 1){
            this.texture = "";
        }
        else if(type == 2){
            this.texture = "";
        }
        else{
            console.error("Invalid obstacle type attempted instatiation");
        }


        super(scene, 999, 999, this.texture, frame);
        scene.add.existing(this);   // add to exisiting scene
    }

    update() {
        if(this.active){
            //modify the speed of obstacle by the current speed modifier determined in Play.js
            this.x -= 2 * Play.speedModifier;

            if(this.x <= 0 - this.width){
                this.end();
            }
        }
    }

    // spawn the obstacle and set active
    begin() {
        this.active = true;
        this.x = 640;
        this.y = 400;
    }

    //used for when the obstacle reaches left hand side - set inactive
    end() {
        this.active = false;
        this.x = 999;
        this.y = 999;

        random = Math.randomInt(3); //creates either 0, 1, or 3

        //the following switch block takes the previously generated random number and
        //activates the corresponding obstacle through the Play class
        switch(random){
            case 0:
                Play.obstacle1.begin();
                break;
            case 1:
                Play.obstacle2.begin();
                break;
            case 2:
                Play.obstacle3.begin();
                break;
            default:
                console.error("Invalid random obstacle attempted activation.");
        }
    }
}