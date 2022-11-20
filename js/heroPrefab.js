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
    }

    preUpdate(time,delta)
    {
        //PLAYER HAS ARMOUR
        if(this.health == 2)
        {
            //ARMOUR animations
            if(this.cursores.down.isDown)
            {
                //CROUCHING THROW
                if(this.cursores.space.isDown && this.cursores.down.isDown) //TODO: attack logic
                    this.anims.play('attackCrouch', true);
                
                    else //STAY CROUCHED
                    this.anims.stop().setFrame(7);
            }
            //PLAYER ATTACK 
            //NORMAL THROW
            else if(this.cursores.space.isDown)
            {
                //TODO: attack logic
                this.anims.play('attack', true);
                this.body.setVelocityX(0);
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
    
            if(!this.body.onFloor())
            {   
                if(this.cursores.space.isDown)
                {
                    //EL CUERPO SE MUEVE SI 
                    if(this.cursores.left.isDown)
                        this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED);
                    
                    else if (this.cursores.right.isDown)
                        this.body.setVelocityX(gamePrefs.ARTHUR_SPEED);

                    this.anims.play('attack', true);
                }
                else if(this.cursores.right.isDown || 
                    this.cursores.left.isDown) 
                {
                    this.anims.stop().setFrame(5);
                }
                else
                {
                    this.anims.stop().setFrame(6);
                }
            }
        }

        //PLAYER HAS NO ARMOUR
        else
        {
            //NAKED ANIMATIONS
            if(this.cursores.down.isDown)
            {
                this.body.setVelocityX(0);
                if(this.cursores.space.isDown)  //TODO: attack logic
                    this.anims.play('attackCrouchNaked', true);
                
                else
                    this.anims.stop().setFrame(23);
            }
            //NORMAL THROW
            else if(this.cursores.space.isDown)
            {
                //TODO: attack logic
                this.anims.play('attackNaked', true);
                this.body.setVelocityX(0);
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
    
            if(!this.body.onFloor())
            {
                //NORMAL THROW
                if(this.cursores.space.isDown)
                {
                   //EL CUERPO SE MUEVE SI SE ESTA PULSANDO LOS BOTONES DE DIRECCION
                    if(this.cursores.left.isDown)
                        this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED);
                    
                    else if (this.cursores.right.isDown)
                        this.body.setVelocityX(gamePrefs.ARTHUR_SPEED);

                    //PLAY THE ATTACK ANIMATION
                    this.anims.play('attackNaked', true);
                }
                else if(this.cursores.right.isDown || 
                    this.cursores.left.isDown) 
                {
                    this.anims.stop().setFrame(21);
                }
                else
                {
                    this.anims.stop().setFrame(22);
                }
            }           
        }

        super.preUpdate(time, delta);
    }
}