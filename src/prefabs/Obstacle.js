// Obstacle prefab
class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to exisiting scene
    }

    update() {
        
    }

    // position reset
    reset() {

    }
}