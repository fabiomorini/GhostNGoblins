class spearPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _tag = 'spear') {
        super(_scene, _posX, _posY, _tag);
        _scene.add.existing(this);
        _scene.physics.add.collider
            (
                this,
                _scene.tombs,
                this.hasHitTomb
            );

        _scene.physics.add.collider
            (
                this,
                _scene.enemiesSpawned,
                _scene.arthur.hasHitEnemy
            );
        this.aliveTime = 0;
    }

    hasHitTomb(_this, _tomb) {
        _this.setActive(false);
        _this.y += 500;
        _this.scene.sound.play('projectileBlock');
    }

    hasHitNull(_this, _null) {
        _this.setActive(false);
        _this.y += 500;
    }

    preUpdate(time, delta) {
        this.aliveTime = this.scene.time.addEvent(
            {
                delay: 1000,
                callback: this.destroy,
                callbackScope: this,
                repeat: 0
            }
        );
        super.preUpdate(time, delta);
    }
}