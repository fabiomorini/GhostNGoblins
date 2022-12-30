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
        this.score = 0;
        this.throwAnimation = "throw";
        this.throwAnimationCrouch = "throwCrouch";
        this.runAnimation = "run";
        this.selectAnimation = [5,6];
        this.canClimbLadders = false;
        this.canDownLadders = false;


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
        this.attack = _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.jump = _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.invencibile = _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
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
        // Comprobamos qué tipo de arma está seleccionada
        if (this.key1.isDown) {
          this.weapon = 0; // Spear
        } else if (this.key2.isDown) {
          this.weapon = 1; // Knife
        } else if (this.key3.isDown) {
          this.weapon = 2; // Fire
        }
      
        // Si se está pulsando la tecla de ataque y no se está disparando actualmente
        if (this.attack.isDown && !this.isAttacking) {
          // Comprobamos si se puede disparar con el tipo de arma seleccionada
          if (this.canShoot(this.weapon)) {
            this.timeSinceLastShot = this.scene.time.addEvent(
                {
                    delay: 50,
                    callback: this.shoot(this.weapon),
                    callbackScope: this,
                    repeat: 0
                }
            );
            this.isAttacking = true;
          }
        } else if (!this.attack.isDown && this.isAttacking) {
          this.isAttacking = false;
        }
    }
      
      // Función para comprobar si se puede disparar con el tipo de arma especificado
      canShoot(weapon) {
        if (weapon === 0) {
          return this.spears.countActive() < gamePrefs.MAX_BULLET_AMOUNT;
        } else if (weapon === 1) {
          return this.knives.countActive() < gamePrefs.MAX_BULLET_AMOUNT;
        } else if (weapon === 2) {
          return this.fires.countActive() < gamePrefs.MAX_FIRE_AMOUNT;
        }
    }

    shoot(weapon) {
        if (weapon === 0) {
          this.shootSpear();
        } else if (weapon === 1) {
          this.shootKnife();
        } else if (weapon === 2) {
          this.shootFire();
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

    deathByFall(){
        if(this.y > 178){
            console.log("F");
        }
    }

    changeMountainCollisions(){
        if(!this.scene.allMountainCollisionsAreModified && this.x > 520){
            var tiles = this.scene.terrain2F.culledTiles
    
            if (tiles != null) {
                for (var i = 0; i < tiles.length; i++) {
                    if (tiles[i] != null && tiles[i].y == 3 &&
                       (tiles[i].index == 11 || tiles[i].index == 12)) {
                           tiles[i].setCollision(false, false, true, false);
                    }
                }
            }
            if(this.x >= 1140){
                this.scene.allMountainCollisionsAreModified = true;
            }
        }
    }

    resizeCollision() {
        if (!this.cursorKeys.down.isDown) {
            this.setSize(32 + 2, 32 + 2, true)
            this.body.setSize(12, 28, true);
        }
        else {
            this.setSize(32 + 2, 32 + 10, true)
            this.body.setSize(12, 20, true);
        }
    }

    checkBorders()
    {
        if(this.body.position.x <= 4)
            this.body.setVelocityX(gamePrefs.ARTHUR_SPEED);
        
        if(this.body.position.x >= 3540)
            this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED);
    }

    setAnimations(){
        if (this.hasArmour)
        {
            this.throwAnimation = "throw";
            this.throwAnimationCrouch = "throwCrouch";
            this.runAnimation = "run";
            this.selectAnimation = [4,5,6,7];
        }
        else
        {
            this.throwAnimation = "throwNaked";
            this.throwAnimationCrouch = "throwCrouchNaked";
            this.runAnimation = "runNaked";
            this.selectAnimation = [18,21,22,23];
        }
    }

    throwAttack(){
        if (this.cursorKeys.down.isDown) {
            this.anims.play(this.throwAnimationCrouch, true);
            this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.anims.stop().setFrame(this.selectAnimation[3]);
            });
        }
        else {
            if (this.body.onFloor())
                this.body.setVelocityX(0);
            this.anims.play(this.throwAnimation, true);
            this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.anims.stop().setFrame(this.selectAnimation[0]);
            });
        }
    }

    useLadder(_player, _ladders) {
        var tile1 = this.scene.ladders.getTileAtWorldXY(this.x, this.y);
        var tile2 = this.scene.ladders.getTileAtWorldXY(this.x, this.y + 32);

        //Si estamos en una escalera, desactivamos el salto y el movimiento lateral del jugador

        if(tile1 != null && tile1.index != null && tile1.index != 0){
            //Si esto se cumple se pueden subir escaleras
            this.canClimbLadders = true;
        }
        else this.canClimbLadders = false;

        if(_player.y >= 177){
            //Si esto se cumple, SOLO se podrán subir
            this.canDownLadders = false;
        }
        
        if(tile2 != null && tile2.index != null && tile2.index != 0){
            //Si esto se cumple se pueden bajar escaleras
            this.canDownLadders = true;
        }
        else this.canDownLadders = false;

        if(_player.y <= 97){
            //Si esto se cumple, SOLO se podrán bajar
            this.canClimbLadders = false;
        }

        //Si no podemos subir o bajar por escaleras, reestablecemos la gravedad
        if(!this.canClimbLadders && !this.canDownLadders){
            this.body.allowGravity = true;
        }
    }

    playerMovement(){
        if (this.isAttacking) {
            this.throwAttack();
        }

        else {
            if (this.cursorKeys.down.isDown) {
                this.body.setVelocityX(0);
                this.anims.stop().setFrame(this.selectAnimation[3]);
            }
    
            else if (this.body.onFloor()) {
                //Left
                if (this.cursorKeys.left.isDown){
                    this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED);
                    this.setFlipX(true);
                    this.anims.play(this.runAnimation, true);
                    this.direction = -1;
                    this.changeMountainCollisions();
                }
                //Right
                else if (this.cursorKeys.right.isDown) {
                    this.body.setVelocityX(gamePrefs.ARTHUR_SPEED);
                    this.setFlipX(false);
                    this.anims.play(this.runAnimation, true);
                    this.direction = 1;
                    this.changeMountainCollisions();
                }

                else if (this.canClimbLadders && this.cursorKeys.up.isDown) {
                    // Si el personaje está en una escalera y se está moviendo hacia arriba,
                    // ajustamos su velocidad vertical para que suba en la escalera
                    this.body.setVelocityY(-gamePrefs.ARTHUR_SPEED);
                    this.body.allowGravity = false;
                    // this.anims.stop().setFrame(this.selectAnimation[4]); // Animación de subir escaleras
                }
            
                else if (this.canDownLadders && this.cursorKeys.down.isDown) {
                    // Si el personaje está en una escalera y se está moviendo hacia abajo,
                    // ajustamos su velocidad vertical para que baje en la escalera
                    this.body.setVelocityY(gamePrefs.ARTHUR_SPEED);
                    this.body.allowGravity = false;
                    // this.anims.stop().setFrame(this.selectAnimation[5]); // Animación de bajar escaleras
                }

                else {
                    this.body.setVelocityX(0);
                    this.anims.stop().setFrame(this.selectAnimation[0]);
                }
    
                //Jump
                if (this.jump.isDown &&
                    this.body.blocked.down &&
                    Phaser.Input.Keyboard.DownDuration(this.jump, 250)) {
                    this.body.setVelocityY(-gamePrefs.ARTHUR_JUMP);
                    this.scene.sound.play('arthurJump');
                }
            }

            if (!this.body.onFloor() && !this.isAttacking) {
                if (this.cursorKeys.right.isDown || this.cursorKeys.left.isDown) {
                    this.anims.stop().setFrame(this.selectAnimation[1]);
                }

                if (!this.body.onFloor() && !this.isAttacking) {
                    if (this.cursorKeys.right.isDown || this.cursorKeys.left.isDown) {
                        this.anims.stop().setFrame(this.selectAnimation[1]);
                    }
                    else {
                        this.anims.stop().setFrame(this.selectAnimation[2]);
                    }
                }
            }
        }
    }

    healthManager(){
        if (this.health == 1) {
            if (this.direction == 1) this.body.velocity.x = -256;
            else this.body.velocity.x = 256;

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
            this.death()
        }
    }

    death(){
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

        //Save Score
        if(this.score > gamePrefs.topScore){
            gamePrefs.topScore = this.score;
        }

        //Musica de muerte de Arthur
        if (!this.isAlive) {
            this.scene.sound.play('arthurDeath');
            this.isAlive = true;
        }
    }

    preUpdate(time, delta) {
        this.resizeCollision();
        this.checkArmour();
        this.resetAttackAnim();
        this.setAnimations();
        if (this.tookDamage) {
            this.healthManager();
        }
        else {
            this.playerMovement();
        }

        this.checkBorders();
        this.setInvencible();
        super.preUpdate(time, delta);
    }

    endInvincibility() {
        this.isInvincible = false;
    }

    setInvencible(){
        if(this.invencibile.isDown)
        this.isInvincible = true;
    }
}