class playerPrefab extends actorPrefab
{
    constructor(_scene,_positionX,_positionY,_spriteTag='arthur')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.cursorKeys = _scene.input.keyboard.createCursorKeys(); 
        this.health = 2;     
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
            _scene.ladders
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

    loadPools()
    {
        //Weapon bullets Pool
        this.spears = this.scene.physics.add.group();
        this.knives = this.scene.physics.add.group();
        this.fires = this.scene.physics.add.group();
    }

    checkArmour()
    {
        if(this.health == 2)
            this.hasArmour = true;
        else
            this.hasArmour = false;
    }

    resetAttackAnim()
    {
        //Temporal: Swap between weapons
        if(this.key1.isDown)
        {
            this.weapon = 0; // Spear
        }
        else if(this.key2.isDown)
        {
            this.weapon = 1;  // Knife
        }
        else if(this.key3.isDown)
        {
            this.weapon = 2; // Fire
        }
        //TODO finish spawning only one animation
        //this.anims.complete()
        if(this.weapon == 0){ // Spear
            if(this.cursorKeys.space.isDown && 
                !this.isAttacking && 
                this.spears.countActive() < gamePrefs.MAX_BULLET_AMOUNT)
            {
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
            else if(!this.cursorKeys.space.isDown && this.isAttacking)
            {
                this.isAttacking = false;
            }
        }
        else if(this.weapon == 1) // Knife
        {
            if(this.cursorKeys.space.isDown && 
                !this.isAttacking && 
                this.knives.countActive() < gamePrefs.MAX_BULLET_AMOUNT)
            {
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
            else if(!this.cursorKeys.space.isDown && this.isAttacking)
            {
                this.isAttacking = false;
            }
        }
        else // Fire
        {
            if(this.cursorKeys.space.isDown && 
                !this.isAttacking && 
                this.fires.countActive() < gamePrefs.MAX_BULLET_AMOUNT)
            {
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
            else if(!this.cursorKeys.space.isDown && this.isAttacking)
            {
                this.isAttacking = false;
            }
        }
    }

    shootSpear()
    {
        //Spawn the bullet in the correct spot
        var auxX = -30;
        var auxY = -8;
        
        if(this.direction == 1)
            auxX = 30;
        
        if(this.cursorKeys.down.isDown)
            auxY = 6;
        
    
        var _bullet = this.spears.getFirst(false);
        
        _bullet = new spearPrefab(this.scene, this.x + auxX, this.y + auxY);
        this.spears.add(_bullet);
        
        _bullet.body.allowGravity = false;
        _bullet.startingPosX = this.x + auxX;
        
        if (this.direction == 1)
        { 
            _bullet.setFlipX(false);
            _bullet.body.setVelocityX(gamePrefs.SPEAR_SPEED_);
        }
        else if(this.direction == -1)
        {
            _bullet.setFlipX(true);
            _bullet.body.setVelocityX(-gamePrefs.SPEAR_SPEED_);
        }
    }

    shootFire()
    {
        //Spawn the bullet in the correct spot
        var auxX = -30;
        var auxY = -8;
        
        if(this.direction == 1)
            auxX = 30;
        
        if(this.cursorKeys.down.isDown)
            auxY = 6;
        
    
        var _bullet = this.fires.getFirst(false);
        
        _bullet = new firePrefab(this.scene, this.x + auxX, this.y + auxY);
        this.fires.add(_bullet);
        
        _bullet.body.allowGravity = true;
        _bullet.startingPosX = this.x + auxX;
        
        if (this.direction == 1)
        { 
            _bullet.setFlipX(false);
            _bullet.body.setVelocityX(gamePrefs.SPEAR_SPEED_);
            _bullet.body.setVelocityY(-gamePrefs.SPEAR_SPEED_);
        }
        else if(this.direction == -1)
        {
            _bullet.setFlipX(true);
            _bullet.body.setVelocityX(-gamePrefs.SPEAR_SPEED_);
            _bullet.body.setVelocityY(-gamePrefs.SPEAR_SPEED_);
        }
    }

    shootKnife()
    {
        //Spawn the bullet in the correct spot
        var auxX = -30;
        var auxY = -8;
        
        if(this.direction == 1)
            auxX = 30;
        
        if(this.cursorKeys.down.isDown)
            auxY = 6;
        
    
        var _bullet = this.knives.getFirst(false);
        
        _bullet = new knifePrefab(this.scene, this.x + auxX, this.y + auxY);
        this.knives.add(_bullet);
        
        _bullet.body.allowGravity = false;
        _bullet.startingPosX = this.x + auxX;
        
        if (this.direction == 1)
        { 
            _bullet.setFlipX(false);
            _bullet.body.setVelocityX(gamePrefs.SPEAR_SPEED_ * 1.5);
        }
        else if(this.direction == -1)
        {
            _bullet.setFlipX(true);
            _bullet.body.setVelocityX(-gamePrefs.SPEAR_SPEED_* 1.5);
        }
    }

    preUpdate(time,delta)
    {
        this.checkArmour();
        this.resetAttackAnim();    
        
        if(this.hasArmour)
        {
            if(this.isAttacking)
            {
                if(this.cursorKeys.down.isDown)
                {
                    this.anims.play('throwCrouch', true);
                    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=> {
                        this.anims.stop().setFrame(7);
                    });
                }
                else
                {
                    if(this.body.onFloor())
                        this.body.setVelocityX(0);
                    this.anims.play('throw', true);
                    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=> {
                        this.anims.stop().setFrame(4);
                    });
                }
            }
            else
            {
                //Crouch
                if(this.cursorKeys.down.isDown)
                {
                    this.body.setVelocityX(0);
                    this.anims.stop().setFrame(7);
                }
                //Left
                else if(this.cursorKeys.left.isDown)
                {
                    this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED);
                    this.setFlipX(true);
                    this.anims.play('run',true);
                    this.direction = -1;
                }         
                //Right
                else if(this.cursorKeys.right.isDown)
                {
                    this.body.setVelocityX(gamePrefs.ARTHUR_SPEED);
                    this.setFlipX(false);
                    this.anims.play('run',true);
                    this.direction = 1;
                }
                else
                {
                    this.body.setVelocityX(0);
                    this.anims.stop().setFrame(4);
                }

                //Jump
                if(this.cursorKeys.up.isDown &&
                this.body.blocked.down &&
                Phaser.Input.Keyboard.DownDuration(this.cursorKeys.up,250))
                {
                    this.body.setVelocityY(-gamePrefs.ARTHUR_JUMP);            
                }
        
                if(!this.body.onFloor() && !this.isAttacking)
                {
                    if(this.cursorKeys.right.isDown || this.cursorKeys.left.isDown) 
                    {
                        this.anims.stop().setFrame(5);
                    }
                    else
                    {
                        this.anims.stop().setFrame(6);
                    }
                }
            }
        }
        else
        {
             if(this.isAttacking)
             {
                if(this.cursorKeys.down.isDown)
                {
                    this.anims.play('throwCrouchNaked', true);
                    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=> {
                        this.anims.stop().setFrame(23);
                    });
                }
                else
                {
                    if(this.body.onFloor())
                        this.body.setVelocityX(0);
                    this.anims.play('throwNaked', true);
                    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=> {
                        this.anims.stop().setFrame(18);
                    });
                }
             }
             else
             {
                //Crouch
                if(this.cursorKeys.down.isDown)
                {
                    this.body.setVelocityX(0);
                    this.anims.stop().setFrame(23);
                }
                //Left
                else if(this.cursorKeys.left.isDown) 
                {
                    this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED);
                    this.setFlipX(true);
                    this.anims.play('runNaked',true);
                    this.direction = -1;
                }         
                //Right
                else if(this.cursorKeys.right.isDown)
                {
                    this.body.setVelocityX(gamePrefs.ARTHUR_SPEED);
                    this.setFlipX(false);
                    this.anims.play('runNaked',true);
                    this.direction = 1;
                }
                else
                {
                    this.body.setVelocityX(0);
                    this.anims.stop().setFrame(18);
                }

                //Jump
                if(this.cursorKeys.up.isDown &&
                this.body.blocked.down &&
                Phaser.Input.Keyboard.DownDuration(this.cursorKeys.up,250))
                {
                    this.body.setVelocityY(-gamePrefs.ARTHUR_JUMP);            
                }
        
                if(!this.body.onFloor() && !this.isAttacking)
                {
                    if(this.cursorKeys.right.isDown || this.cursorKeys.left.isDown) 
                    {
                        this.anims.stop().setFrame(21);
                    }
                    else
                    {
                        this.anims.stop().setFrame(22);
                    }
                }
            }
    }

        super.preUpdate(time, delta);
    }

    update()
    {
    }
}