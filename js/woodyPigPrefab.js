class woodyPigPrefab extends actorPrefab {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'woodyPig') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.minimumHeight = _positionY + 80;
        console.log(this.minimumHeight);
        this.direction = -1
        this.scene = _scene;
        this.playerDistanceHorizontal = 0;
        this.canGoUp = false;
        this.anims.play('woodyPigMove', true);
        this.body.setAllowGravity(false);
        _scene.physics.add.overlap
            (
                this,
                _scene.arthur,
                this.hit,
                null,
                this
            );

        //this.body.setSize(15, 30, true)
    }

    hit(_woodyPig, _arthur) {
        if (_arthur.isInvincible == false) {
            _arthur.tookDamage = true;
            _arthur.isInvincible = true;
            _arthur.health -= 1;
        }
    }

    turnLogic() {
        this.playerDistanceHorizontal = this.body.position.x - this.scene.arthur.x;
        this.randNum = Phaser.Math.Between(0, 30);


        //Si va hacia la izquierda 
        if (this.playerDistanceHorizontal <= 0 && this.direction == -1) {
            if (this.randNum == 0) {
                if (this.body.position.y < this.minimumHeight) {
                    //Si ha llegado al final puede ir hacia abajo o arriba
                    if (this.canGoUp) {
                        this.randNum2 = Phaser.Math.Between(0, 1);
                        if (this.randNum2 == 0) {
                            this.body.setVelocityY(-gamePrefs.ENEMY_SPEED)
                        }
                        else
                            (
                                this.body.setVelocityY(+gamePrefs.ENEMY_SPEED)
                            )
                    }
                    //Si todavia no ha llegado al final solo puede bajar
                    else {
                        this.body.setVelocityY(+gamePrefs.ENEMY_SPEED)
                    }
                }
                //Si ha llegado al final de todo sube 
                else {
                    this.canGoUp = true;
                    this.body.setVelocityY(-gamePrefs.ENEMY_SPEED)
                }
                var numberTimer = this.scene.time.addEvent
                    (
                        {
                            delay: 100, //ms
                            callback: this.stopVelocity,
                            callbackScope: this,
                            loop: false
                        }
                    );

                this.anims.play("woodyPigTurn", true)
                this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                    this.anims.play("woodyPigMove", true);
                });
                this.direction *= -1;
            }
        }
        //SI va hacia la derecha
        else if (this.playerDistanceHorizontal >= 0 && this.direction == 1) {
            if (this.randNum == 0) {
                if (this.body.position.y < this.minimumHeight) {
                    //Si ha llegado al final puede ir hacia abajo o arriba
                    if (this.canGoUp) {
                        this.randNum2 = Phaser.Math.Between(0, 1);
                        if (this.randNum2 == 0) {
                            this.body.setVelocityY(-gamePrefs.ENEMY_SPEED)
                        }
                        else
                            (
                                this.body.setVelocityY(+gamePrefs.ENEMY_SPEED)
                            )
                    }
                    //Si todavia no ha llegado al final solo puede bajar
                    else {
                        this.body.setVelocityY(+gamePrefs.ENEMY_SPEED)
                    }
                }
                //Si ha llegado al final de todo sube 
                else {
                    this.canGoUp = true;
                    this.body.setVelocityY(-gamePrefs.ENEMY_SPEED)
                }
                var numberTimer = this.scene.time.addEvent
                    (
                        {
                            delay: 100, //ms
                            callback: this.stopVelocity,
                            callbackScope: this,
                            loop: false
                        }
                    );

                this.anims.play("woodyPigTurn", true)
                this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                    this.anims.play("woodyPigMove", true);
                });
                this.direction *= -1;
            }
        }
    }

    attackLogic() {

    }

    stopVelocity() {
        this.body.setVelocityY(0);
    }

    preUpdate(time, delta) {

        this.attackLogic();
        this.turnLogic();

        if (this.direction == 1)
            this.setFlipX(true);
        else
            this.setFlipX(false);
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED * 1.25 * this.direction);


        super.preUpdate(time, delta);
    }
}