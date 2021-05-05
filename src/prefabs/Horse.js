// Horse prefab
class Horse extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        //avoid collision detection
        this.immune = false;
        this.immuneTimer = -1;
    }

    update(time, delta){

        if(this.immune){
            //while its immune, itll have a timer that when it reaches a target, will disable immune
            this.immuneTimer += delta;
            if(this.immuneTimer >= 1200 / speedModifier){
                this.immune = false;
                this.immuneTimer = -1;
                console.log("No longer immune");
            }
        }

        //console.log(this.immune);
    }
}