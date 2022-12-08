class heroPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag='arthur')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        //_scene.physics.add.existing(this); 
        this.cursores = _scene.input.keyboard.createCursorKeys(); 
        this.health = 2;     
        this.isAttacking = false;
        this.timeToAttack
        this.direction = 1;
    }

    preUpdate(time,delta)
    {
        if(this.body.onFloor() && this.isAttacking){
            this.body.setVelocityX(0);
        }
        //RESET ATTACK ANIM
        if(this.cursores.space.isDown && !this.isAttacking)
        {
            this.isAttacking = true;
        }
        
        if(!this.cursores.space.isDown && this.isAttacking)
        {
            this.isAttacking = false;
        }

        /*
            MOVEMENT ANIMATIONS
        */
        //WITH ARMOUR
        if(this.health == 2 && !this.isAttacking)
        {
            //ARMOUR animations
            if(this.cursores.down.isDown)
            {
                this.body.setVelocityX(0);
                this.anims.stop().setFrame(7);
            }
            else if(this.cursores.left.isDown) // LEFT 
            {
                //ME MUEVO A LA IZQUIERDA
                this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED);
                this.setFlipX(true);
                this.anims.play('run',true);
            }         
            else if(this.cursores.right.isDown) // RIGHT 
            {
                //ME MUEVO A LA DERECHA
                this.body.setVelocityX(gamePrefs.ARTHUR_SPEED);
                this.setFlipX(false);
                this.anims.play('run',true);
            }
            else
            {
                //NO ME MUEVO AT ALL
                this.body.setVelocityX(0);
                this.anims.stop().setFrame(4);
            }
            
            //SALTO
            if(this.cursores.up.isDown &&
            this.body.blocked.down &&  
            Phaser.Input.Keyboard.DownDuration(this.cursores.up,250))
            {
                this.body.setVelocityY(-gamePrefs.ARTHUR_JUMP);            
            }
            if(!this.body.onFloor() && !this.isAttacking)
            {
                if(this.cursores.right.isDown || this.cursores.left.isDown) 
                {
                    this.anims.stop().setFrame(5);
                }
                else
                {
                    this.anims.stop().setFrame(6);
                }
            }
        }
        //WITHOUT ARMOUR
        else if(this.health < 2 && !this.isAttacking)
        {
            //NAKED ANIMATIONS
            if(this.cursores.down.isDown)
            {
                this.body.setVelocityX(0);
                this.anims.stop().setFrame(23);
            }
            else if(this.cursores.left.isDown) // LEFT 
            {
                //ME MUEVO A LA IZQUIERDA
                this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED);
                this.setFlipX(true);
                this.anims.play('runNaked',true);
            }         
            else if(this.cursores.right.isDown) // RIGHT 
            {
                //ME MUEVO A LA DERECHA
                this.body.setVelocityX(gamePrefs.ARTHUR_SPEED);
                this.setFlipX(false);
                this.anims.play('runNaked',true);
            }
            else
            {
                //NO ME MUEVO AT ALL
                this.body.setVelocityX(0);
                this.anims.stop().setFrame(18);
            }
            //SALTO
            if(this.cursores.up.isDown &&
            this.body.blocked.down &&
            Phaser.Input.Keyboard.DownDuration(this.cursores.up,250))
            {
                this.body.setVelocityY(-gamePrefs.ARTHUR_JUMP);            
            }
    
            if(!this.body.onFloor() && !this.isAttacking)
            {
                if(this.cursores.right.isDown || this.cursores.left.isDown) 
                {
                    this.anims.stop().setFrame(21);
                }
                else
                {
                    this.anims.stop().setFrame(22);
                }
            }
        }

        /*
            ATTACK ANIMATIONS
        */
        //WITH ARMOUR
        if(this.health == 2 && this.isAttacking)
        {
            //CROUCHING THROW
            if(this.cursores.down.isDown)
            {
                shoot()
                this.anims.play('throwCrouch', true);
            }
            //NORMAL THROW
            else
            {
                shoot()
                this.anims.play('throw', true);
            }
        }
        //WITHOUT ARMOUR
        else if(this.health < 2 && this.isAttacking)
        {
            //CROUCHING THROW
            if(this.cursores.down.isDown)
            {
                shoot()
                this.anims.play('throwCrouchNaked', true);
            }
            //NORMAL THROW
            else
            {
                shoot()
                this.anims.play('throwNaked', true);
            }
        }

        function shoot(){
            this.newProjectile = new platformer
                                 .playerBulletPrefab(platformer.game,this.x+(20*this.scale.x),this.y-this.shootOffset,this.weaponType, this.level);
        }

        super.preUpdate(time, delta);
    }
}