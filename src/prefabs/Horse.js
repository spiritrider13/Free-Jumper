// Horse prefab
class Horse extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to exisiting scene
        //this.moveSpeed = game.settings.horseSpeed;         // pixels per frame

        //avoid collision detection
        this.immune = false;
        this.immuneTimer = -1;
    }

    update(time, delta){
        if(this.immune){
            this.immuneTimer += delta;
            if(this.immuneTimer >= 1000){
                this.immune = false;
                this.immuneTimer = -1;
            }
        }

        //console.log(this.immune);
    }
}