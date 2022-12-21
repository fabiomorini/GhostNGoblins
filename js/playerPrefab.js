class playerPrefab extends actorPrefab {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'arthur') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.cursorKeys = _scene.input.keyboard.createCursorKeys();
        this.health = 2;
        this.tookDamage = false;
        this.isInvincible = false;
        this.isAttacking = false;
        this.timeToAttack
        this.direction = 1;
        this.bulletHeight = 28;
        this.spears;
        this.knives;
        this.fires;
        this.hasArmour = true;
        this.timeSinceLastShot;
        this.weapon = 0;
        this.canClimbLadder = false;
        this.canDownLadder = false;

        this.body.setSize(12, 28, true);

        _scene.physics.add.collider
            (
                this,
                _scene.tombs1F
            );

        _scene.physics.add.collider
            (
                this,
                _scene.tombs2F
            );

        _scene.physics.add.overlap
            (
                this,
                _scene.ladders,
                this.useLadder,
                null,
                this
            );

        _scene.physics.add.overlap
            (
                this,
                _scene.water
            );

        this.loadPools();
        this.key1 = _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE);
        this.key2 = _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO);
        this.key3 = _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE);
    }

    loadPools() {
        //Weapon bullets Pool
        this.spears = this.scene.physics.add.group();
        this.knives = this.scene.physics.add.group();
        this.fires = this.scene.physics.add.group();
    }

    checkArmour() {
        if (this.health == 2)
            this.hasArmour = true;
        else
            this.hasArmour = false;
    }

    resetAttackAnim() {
        //Temporal: Swap between weapons
        if (this.key1.isDown) {
            this.weapon = 0; // Spear
        }
        else if (this.key2.isDown) {
            this.weapon = 1;  // Knife
        }
        else if (this.key3.isDown) {
            this.weapon = 2; // Fire
        }
        //TODO finish spawning only one animation
        //this.anims.complete()
        if (this.weapon == 0) { // Spear
            if (this.cursorKeys.space.isDown &&
                !this.isAttacking &&
                this.spears.countActive() < gamePrefs.MAX_BULLET_AMOUNT) {
                this.timeSinceLastShot = this.scene.time.addEvent(
                    {
                        delay: 50,
                        callback: this.shootSpear,
                        callbackScope: this,
                        repeat: 0
                    }
                );
                this.isAttacking = true;
            }
            else if (!this.cursorKeys.space.isDown && this.isAttacking) {
                this.isAttacking = false;
            }
        }
        else if (this.weapon == 1) // Knife
        {
            if (this.cursorKeys.space.isDown &&
                !this.isAttacking &&
                this.knives.countActive() < gamePrefs.MAX_BULLET_AMOUNT) {
                this.timeSinceLastShot = this.scene.time.addEvent(
                    {
                        delay: 50,
                        callback: this.shootKnife,
                        callbackScope: this,
                        repeat: 0
                    }
                );
                this.isAttacking = true;
            }
            else if (!this.cursorKeys.space.isDown && this.isAttacking) {
                this.isAttacking = false;
            }
        }
        else // Fire
        {
            if (this.cursorKeys.space.isDown &&
                !this.isAttacking &&
                this.fires.countActive() < gamePrefs.MAX_FIRE_AMOUNT) {
                this.timeSinceLastShot = this.scene.time.addEvent(
                    {
                        delay: 50,
                        callback: this.shootFire,
                        callbackScope: this,
                        repeat: 0
                    }
                );
                this.isAttacking = true;
            }
            else if (!this.cursorKeys.space.isDown && this.isAttacking) {
                this.isAttacking = false;
            }
        }
    }

    shootSpear() {
        //Spawn the bullet in the correct spot
        var auxX = -15;
        var auxY = -8;

        if (this.direction == 1)
            auxX = 15;

        if (this.cursorKeys.down.isDown)
            auxY = 6;


        var _bullet = this.spears.getFirst(false);

        _bullet = new spearPrefab(this.scene, this.x + auxX, this.y + auxY);
        this.spears.add(_bullet);

        _bullet.body.allowGravity = false;
        _bullet.body.setSize(1, 1);
        _bullet.startingPosX = this.x + auxX;

        if (this.direction == 1) {
            _bullet.setFlipX(false);
            _bullet.body.setVelocityX(gamePrefs.SPEAR_SPEED_);
        }
        else if (this.direction == -1) {
            _bullet.setFlipX(true);
            _bullet.body.setVelocityX(-gamePrefs.SPEAR_SPEED_);
        }
        //Sonido de lanzar ataque
        this.scene.sound.play('arthurThrow');
    }

    shootFire() {
        //Spawn the bullet in the correct spot
        var auxX = -15;
        var auxY = -8;

        if (this.direction == 1)
            auxX = 15;

        if (this.cursorKeys.down.isDown)
            auxY = 6;


        var _bullet = this.fires.getFirst(false);

        _bullet = new firePrefab(this.scene, this.x + auxX, this.y + auxY);
        this.fires.add(_bullet);

        _bullet.body.allowGravity = true;
        _bullet.body.setSize(1, 1);
        _bullet.startingPosX = this.x + auxX;

        if (this.direction == 1) {
            _bullet.setFlipX(false);
            _bullet.body.setVelocityX(gamePrefs.SPEAR_SPEED_);
            _bullet.body.setVelocityY(-gamePrefs.SPEAR_SPEED_);
        }
        else if (this.direction == -1) {
            _bullet.setFlipX(true);
            _bullet.body.setVelocityX(-gamePrefs.SPEAR_SPEED_);
            _bullet.body.setVelocityY(-gamePrefs.SPEAR_SPEED_);
        }
        //Sonido de lanzar ataque
        this.scene.sound.play('arthurThrow');
    }

    shootKnife() {
        //Spawn the bullet in the correct spot
        var auxX = -15;
        var auxY = -8;

        if (this.direction == 1)
            auxX = 15;

        if (this.cursorKeys.down.isDown)
            auxY = 6;


        var _bullet = this.knives.getFirst(false);

        _bullet = new knifePrefab(this.scene, this.x + auxX, this.y + auxY);
        this.knives.add(_bullet);

        _bullet.body.allowGravity = false;
        _bullet.body.setSize(1, 1);
        _bullet.startingPosX = this.x + auxX;

        if (this.direction == 1) {
            _bullet.setFlipX(false);
            _bullet.body.setVelocityX(gamePrefs.SPEAR_SPEED_ * 1.5);
        }
        else if (this.direction == -1) {
            _bullet.setFlipX(true);
            _bullet.body.setVelocityX(-gamePrefs.SPEAR_SPEED_ * 1.5);
        }
        //Sonido de lanzar ataque
        this.scene.sound.play('arthurThrow');
    }

    useLadder(_player, _ladder) {
        var tile1 = this.scene.ladders.getTileAtWorldXY(this.x, this.y);
        var tile2 = this.scene.ladders.getTileAtWorldXY(this.x, this.y + 20);

        if (tile1 != null && tile1.index != 0) {
            // this.canClimbLadder = true;
        }

        if (tile1 == null) {
            this.canClimbLadder = false;
            this.body.setAllowGravity(true);
            this.body.setMaxVelocityX(gamePrefs.ARTHUR_SPEED);
        }

        if (tile2 != null && tile2.index != 0 && tile2.index != 10) {
            // this.canDownLadder = true;
        }

        if (tile2 == null) {
            this.canDownLadder = false;
            this.body.setAllowGravity(true);
            this.body.setMaxVelocityX(gamePrefs.ARTHUR_SPEED);
        }
    }

    touchWater(_player, _water) {
        var tile = this.scene.water.getTileAtWorldXY(this.x, this.y);
        if (tile != null && tile.index != 0) {
            console.log("Funciona");
        }
    }

    resizeCollision()
    {
        if(!this.cursorKeys.down.isDown)
        {
            this.setSize(32 + 2, 32 + 2, true)
            this.body.setSize(12, 28, true);
        }
        else
        {
            this.setSize(32 + 2, 32 + 10, true)
            this.body.setSize(12, 20, true);
        }
    }

    preUpdate(time, delta) {
        this.resizeCollision();
        this.checkArmour();
        this.resetAttackAnim();
        if (this.tookDamage) {
            if (this.health == 1) {
                if(this.direction == 1) this.body.velocity.x = -256;
                else    this.body.velocity.x = 256;
                
                this.body.velocity.y = -300;
                this.anims.stop().setFrame(32);
                var b_armour = new breakArmourPrefab(this.scene, this.body.position.x, this.body.position.y);
                var invincibleTimer = this.scene.time.addEvent({
                    delay: 1500, //ms
                    callback: this.endInvincibility,
                    callbackScope: this,
                    loop: false
                });
                if (this.direction == 1) {
                    b_armour.setFlipX(false);
                }
                else if (this.direction == -1) {
                    b_armour.setFlipX(true);
                }
                this.tookDamage = false;
                this.scene.sound.play('arthurHit');
            }
            else if (this.health <= 0) {
                //DIE ANIMATION.
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
                this.anims.play('die', true);
                this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                    this.body.reset(65, 100);
                    this.scene.cameras.main.shake(500, 0.05);
                    this.scene.cameras.main.flash(500, 255, 0, 0);
                    this.health = 2;
                    this.tookDamage = false;
                    this.isInvincible = false;
                    this.isAlive = false;
                });
                //Musica de muerte de Arthur
                if(!this.isAlive) {
                    this.scene.sound.play('arthurDeath');
                    this.isAlive = true;
                }
            }
        }
        else {
            if (this.hasArmour) {
                if (this.isAttacking) {
                    if (this.cursorKeys.down.isDown) {
                        this.anims.play('throwCrouch', true);
                        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                            this.anims.stop().setFrame(7);
                        });
                    }
                    else {
                        if (this.body.onFloor())
                            this.body.setVelocityX(0);
                        this.anims.play('throw', true);
                        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                            this.anims.stop().setFrame(4);
                        });
                    }
                }
                else {
                    if (this.cursorKeys.down.isDown) {
                        if (this.canDownLadder) {
                            this.body.setAllowGravity(false);
                            this.body.setMaxVelocityX(0);
                            this.body.setMaxVelocityX(gamePrefs.ARTHUR_SPEED);
                            this.body.setVelocityY(gamePrefs.ARTHUR_SPEED);
                        }
                        else {
                            this.body.setVelocityX(0);
                            this.anims.stop().setFrame(7);
                        }
                    }
                    else if (this.body.onFloor()) {
                        //Left
                        if (this.cursorKeys.left.isDown) {
                            this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED);
                            this.setFlipX(true);
                            this.anims.play('run', true);
                            this.direction = -1;
                        }
                        //Right
                        else if (this.cursorKeys.right.isDown) {
                            this.body.setVelocityX(gamePrefs.ARTHUR_SPEED);
                            this.setFlipX(false);
                            this.anims.play('run', true);
                            this.direction = 1;
                        }
                        else {
                            this.body.setVelocityX(0);
                            this.anims.stop().setFrame(4);
                        }

                        //Jump
                        if (this.cursorKeys.up.isDown &&
                            this.body.blocked.down && !this.canClimbLadder &&
                            Phaser.Input.Keyboard.DownDuration(this.cursorKeys.up, 250)) {
                            this.body.setVelocityY(-gamePrefs.ARTHUR_JUMP);
                            this.scene.sound.play('arthurJump');
                        }
                        else if (this.canClimbLadder && this.cursorKeys.up.isDown &&
                            this.body.blocked.down && this.cursorKeys.up.isDown) {
                            this.body.setAllowGravity(false);
                            this.body.setMaxVelocityX(0);
                            this.body.setMaxVelocityX(gamePrefs.ARTHUR_SPEED);
                            this.body.setVelocityY(-gamePrefs.ARTHUR_SPEED);
                        }
                    }

                    if (!this.body.onFloor() && !this.isAttacking) {
                        if (this.cursorKeys.right.isDown || this.cursorKeys.left.isDown) {
                            this.anims.stop().setFrame(5);
                        }

                        if (!this.body.onFloor() && !this.isAttacking) {
                            if (this.cursorKeys.right.isDown || this.cursorKeys.left.isDown) {
                                this.anims.stop().setFrame(5);
                            }
                            else {
                                this.anims.stop().setFrame(6);
                            }
                        }
                    }
                }
            }
            else {
                if (this.isAttacking) {
                    if (this.cursorKeys.down.isDown) {
                        this.anims.play('throwCrouchNaked', true);
                        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                            this.anims.stop().setFrame(23);
                        });
                    }
                    else {
                        if (this.body.onFloor()) this.body.setVelocityX(0);
                        this.anims.play('throwNaked', true);
                        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                            this.anims.stop().setFrame(18);
                        });
                    }
                }
                else {
                    //Crouch
                    if (this.cursorKeys.down.isDown) {
                        if (this.canDownLadder) {
                            this.body.setAllowGravity(false);
                            this.body.setMaxVelocityX(0);
                            this.body.setMaxVelocityX(gamePrefs.ARTHUR_SPEED);
                            this.body.setVelocityY(gamePrefs.ARTHUR_SPEED);
                        }
                        else {
                            this.body.setVelocityX(0);
                            this.anims.stop().setFrame(23);
                        }
                    }
                    else if (this.body.onFloor()) {
                        //Left
                        if (this.cursorKeys.left.isDown) {
                            this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED);
                            this.setFlipX(true);
                            this.anims.play('runNaked', true);
                            this.direction = -1;
                        }
                        //Right
                        else if (this.cursorKeys.right.isDown) {
                            this.body.setVelocityX(gamePrefs.ARTHUR_SPEED);
                            this.setFlipX(false);
                            this.anims.play('runNaked', true);
                            this.direction = 1;
                        }
                        else {
                            this.body.setVelocityX(0);
                            this.anims.stop().setFrame(18);
                        }

                        //Jump
                        if (this.cursorKeys.up.isDown &&
                            this.body.blocked.down && !this.canClimbLadder &&
                            Phaser.Input.Keyboard.DownDuration(this.cursorKeys.up, 250)) {
                            this.body.setVelocityY(-gamePrefs.ARTHUR_JUMP);
                            this.scene.sound.play('arthurJump');
                        }
                        else if (this.canClimbLadder && this.cursorKeys.up.isDown &&
                            this.body.blocked.down && this.cursorKeys.up.isDown) {
                            this.body.setAllowGravity(false);
                            this.body.setMaxVelocityX(0);
                            this.body.setMaxVelocityX(gamePrefs.ARTHUR_SPEED);
                            this.body.setVelocityY(-gamePrefs.ARTHUR_SPEED);
                        }
                    }

                    if (!this.body.onFloor() && !this.isAttacking) {
                        if (this.cursorKeys.right.isDown || this.cursorKeys.left.isDown) {
                            this.anims.stop().setFrame(21);
                        }

                        if (!this.body.onFloor() && !this.isAttacking) {
                            if (this.cursorKeys.right.isDown || this.cursorKeys.left.isDown) {
                                this.anims.stop().setFrame(21);
                            }
                            else {
                                this.anims.stop().setFrame(22);
                            }
                        }
                    }
                }

                if (this.scene.terrain2F.culledTiles.length > 0) {
                    var tiles = this.scene.terrain2F.culledTiles
    
                    if (tiles != null && !(this.canClimbLadder || this.canDownLadder)) {
                        for (var i = 0; i < tiles.length; i++) {
                            if (tiles[i] != null &&
                                tiles[i].collideLeft &&
                                tiles[i].collideRight &&
                                tiles[i].collideUp &&
                                tiles[i].collideDown) {
                                tiles[i].setCollision(false, false, true, false);
                            }
                        }
                    }
                }
                console.log("Climb: " + this.canClimbLadder + ". Down: " + this.canDownLadder + ".");
            }
        }
        super.preUpdate(time, delta);
    }

    update() {
    }

    endInvincibility() {
        this.isInvincible = false;
    }
    //
}