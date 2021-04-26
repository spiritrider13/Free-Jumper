// Horse prefab
class Horse extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to exisiting scene
        this.moveSpeed = game.settings.horseSpeed;         // pixels per frame
    }

    update() {
        // move horse right
        this.x += this.moveSpeed;

        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}