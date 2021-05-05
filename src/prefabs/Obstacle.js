// Obstacle prefab
class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(type, scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   

        this.type = type;
        
    }

    update() {
        //modify the speed of obstacle by the current speed modifier determined in Play.js
        this.x -= (5 * speedModifier);
    }

    // spawn the obstacle and set active
    begin() {
        //add a random offset to the spawn x value
        var random = Math.floor(Math.random() * 500); //creates either 0, 1, or 3

        this.x = 640 + random;
        this.y = 370;
        this.active = true;
        console.log("Obstacle " + this.type + " movement begun");
    }

    end(){
        this.x = 999;
        this.y = 999;
        console.log("Obstacle " + this.type + " movement ceased");
    }
}