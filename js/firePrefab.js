class firePrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _tag = 'fire') {
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
            [_scene.terrain2F,
            _scene.terrainBorder1F,
            _scene.terrain1F],
            this.hasHitNull
        );

        _scene.physics.add.collider
        (
            this,
            _scene.enemiesSpawned,
            _scene.arthur.hasHitEnemy
        );

        this.aliveTime = 0;
        this.anims.play("throwFire");
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

    hasHitUnicorn(_this, _unicorn) {
        _this.setActive(false);
        _this.y += 500;
        _unicorn.health -= 1;
        if (_unicorn.health == 0) {
            var enemyDeath = new enemyDeathPrefab(_this.scene, _unicorn.body.position.x, _unicorn.body.position.y);
            _this.scene.sound.play('enemyDeath');
            _unicorn.destroy();
            //summon key
            //var key = new keyPrefab(_this.scene, _unicorn.body.position.x, _unicorn.body.position.y - 100);
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