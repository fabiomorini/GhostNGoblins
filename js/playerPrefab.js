class heroPrefab extends actorPrefab
{
    constructor(_scene,_positionX,_positionY,_spriteTag='arthur')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        //_scene.physics.add.existing(this); 
        this.cursorKeys = _scene.input.keyboard.createCursorKeys(); 
        this.health = 2;     
        this.isAttacking = false;
        this.timeToAttack
        this.direction = 1;
        this.bulletHeight = 28;
        this.bullets;
        this.hasArmour = true;
        this.timeSinceLastShot;

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
    }

    loadPools()
    {
        //Weapon bullets Pool
        this.bullets = this.scene.physics.add.group();
        //this.bullets.enableBody = true;
        //gamePrefs.physics.arcade.enable(this.bullets);
        
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
        //TODO finish spawning only one animation
        //this.anims.complete()
        if(this.cursorKeys.space.isDown && !this.isAttacking && !this.anims.isPlaying)
        {
            this.isAttacking = true;
        }
        else if(!this.cursorKeys.space.isDown && this.isAttacking && !this.anims.isPlaying)
        {
            this.isAttacking = false;
        }
    }

    shoot()
    {
        //Spawn the bullet in the correct spot
        var auxX = -30;
        var auxY = -8;
        
        if(this.direction == 1)
            auxX = 30;
        
        if(this.cursorKeys.down.isDown)
            auxY = 6;
        
        var _bullet = this.bullets.getFirst(false);

        if(!_bullet)
        {
            //TODO if some time passed before the last shot 
            if(this.bullets.countActive() < gamePrefs.MAX_BULLET_AMOUNT)
            {
                _bullet = new spearPrefab(this.scene, this.x + auxX, this.y + auxY);
                this.bullets.add(_bullet);
            }
            else
            {
                return;
            }
        }
        else
        {
            //_bullet.active = true;
            _bullet.body.reset(this.x + auxX, this.y + auxY);
        }
        
        _bullet.body.allowGravity = false;
        _bullet.startingPosx = this.x + auxX;
        
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
                    this.shoot()
                    this.anims.play('throwCrouch', true);
                }
                else
                {
                    this.shoot()
                    this.anims.play('throw', true);
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
                    this.shoot()
                    this.anims.play('throwCrouchNaked', true);
                }
                else
                {
                    this.shoot()
                    this.anims.play('throwNaked', true);
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
        this.bullets.forEach(gamePrefs.debug.body,gamePrefs.debug)
    }
}