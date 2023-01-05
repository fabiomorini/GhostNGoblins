class knifePrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _tag = 'knife') {
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

        _scene.physics.add.collider
            (
                this,
                _scene.boss,
                this.hasHitUnicorn
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

    hasHitUnicorn(_this, _boss) {
        _this.setActive(false);
        _this.y += 500;
        _boss.health -= 1;
        if (_boss.health == 0) {
            var enemyDeath = new enemyDeathPrefab(_this.scene, _boss.body.position.x, _boss.body.position.y);
            var bossKey = new itemPrefab(_this.scene, 3445, 0, 'item', 'key');
            var enemyDeath = new enemyDeathPrefab(_this.scene, _boss.body.position.x, _boss.body.position.y, 'enemy_death');
            _boss.destroy();
            _this.scene.sound.play('enemyDeath');
        }
        else {
            _this.scene.sound.play('projectileBlock');
        }
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