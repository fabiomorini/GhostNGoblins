class enemyDeathPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _tag = 'enemy_death') {
        super(_scene, _posX, _posY, _tag);
        _scene.add.existing(this);
        this.anims.play('enemyDeath');
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.destroy();
        }, _scene);
    }

}