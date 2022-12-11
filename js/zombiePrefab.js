class zombiePrefab extends actorPrefab {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'zombie') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.startingPos = _positionX;
        this.dist = 0;
        this.maxDistance = 200;
        this.anims.play('zombieSpawn', true);
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isSpawning = false;
        });
        this.direccion = -1;
        this.isSpawning = true;
        this.scene = _scene;
        _scene.physics.add.overlap
            (
                this,
                _scene.arthur,
                this.hit,
                null,
                this
            );

    }

    hit(_zombie, _arthur) {
        if (_arthur.isInvincible == false) {
            _arthur.tookDamage = true;
            _arthur.isInvincible = true;
            _arthur.health -= 1;
        }
        _arthur.body.setVelocityX(0);
        _arthur.body.setVelocityY(-300);
    }

    preUpdate(time, delta) {
        this.dist = Phaser.Math.Distance.Between(this.body.position.x, 0, this.startingPos, 0)
        if (this.dist > this.maxDistance) {
            this.body.setVelocityX(0);
            this.anims.playReverse("zombieSpawn", true);
            this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.anims.stop().setFrame(0);
                this.resetPosition();
            });
        }
        else {
            if (!this.isSpawning) {
                this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direccion);
                this.anims.play('zombieRun', true);
            }
            if (this.body.blocked.right || this.body.blocked.left) {
                this.direccion *= -1;
                this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direccion);
                this.flipX = !this.flipX;
            }
        }

        super.preUpdate(time, delta);
    }

    resetPosition() {
        this.x = this.startingPos;
        this.anims.nextAnim = 'zombieSpawn';
        this.isSpawning = true;
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isSpawning = false;
        });
    }

}