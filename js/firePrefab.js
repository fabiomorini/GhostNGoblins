class firePrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _tag = 'fire') {
        super(_scene, _posX, _posY, _tag);
        _scene.add.existing(this);

        _scene.physics.add.collider
            (
                this,
                [_scene.tombs1F,
                _scene.tombs2F],
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
                _scene.zombie,
                this.hasHitZombie
            );

        _scene.physics.add.collider
            (
                this,
                _scene.greenMonster,
                this.hasHitGreenMonster
            );

        _scene.physics.add.collider
            (
                this,
                _scene.flyingKnight,
                this.hasHitKnight
            );

        _scene.physics.add.collider
            (
                this,
                _scene.woodyPig,
                this.hasHitWoodyPig
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

    hasHitGreenMonster(_this, _greenMonster) {
        _this.setActive(false);
        _this.y += 500;
        var enemyDeath = new enemyDeathPrefab(_this.scene, _greenMonster.body.position.x, _greenMonster.body.position.y);
        _this.scene.sound.play('enemyDeath');
        _greenMonster.destroy();
    }

    hasHitZombie(_this, _zombie) {
        _this.setActive(false);
        _this.y += 500;
        var enemyDeath = new enemyDeathPrefab(_this.scene, _zombie.body.position.x, _zombie.body.position.y);
        _this.scene.sound.play('enemyDeath');
        _zombie.destroy();
    }

    hasHitKnight(_this, _flyingKnight) {
        _this.setActive(false);
        _this.y += 500;
        _flyingKnight.gethit = true;
        if (_flyingKnight.direction == 1) {
            if (_this.body.position.x < _flyingKnight.body.position.x) {
                var enemyDeath = new enemyDeathPrefab(_this.scene, _flyingKnight.body.position.x, _flyingKnight.body.position.y);
                _this.scene.sound.play('enemyDeath');
                _flyingKnight.destroy();
            }
            else { }
        }
        else if (_flyingKnight.direction == -1) {
            if (_this.body.position.x > _flyingKnight.body.position.x) {
                var enemyDeath = new enemyDeathPrefab(_this.scene, _flyingKnight.body.position.x, _flyingKnight.body.position.y);
                _this.scene.sound.play('enemyDeath');
                _flyingKnight.destroy();
            }
            else { }
        }
    }

    hasHitWoodyPig(_this, _woodyPig) {
        _this.setActive(false);
        _this.y += 500;
        var enemyDeath = new enemyDeathPrefab(_this.scene, _woodyPig.body.position.x, _woodyPig.body.position.y);
        _this.scene.sound.play('enemyDeath');
        _woodyPig.destroy();
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