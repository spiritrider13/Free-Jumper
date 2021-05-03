// Horse prefab
class Horse extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to exisiting scene
        //this.moveSpeed = game.settings.horseSpeed;         // pixels per frame
    }
}