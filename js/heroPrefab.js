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
        this.attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    preUpdate(time,delta)
    {
        //PLAYER HAS ARMOUR
        if(this.health == 2)
        {
            if(this.cursores.left.isDown && !this.cursores.down.isDown) // LEFT NOT CROUCHING
            {
                //ME MUEVO A LA IZQUIERDA
                this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED);
                this.setFlipX(true);
                this.anims.play('run',true);
            }
            
            else if(this.cursores.left.isDown && this.cursores.down.isDown) // LEFT CROUCHING
            {
                //ME MUEVO A LA IZQUIERDA AGACHADO
                this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED_CROUCH);
                this.setFlipX(true);
                this.anims.play('run',true);
            }
            
            else if(this.cursores.right.isDown && !this.cursores.right.isDown) // RIGHT NOT CROUCHING
            {
                //ME MUEVO A LA DERECHA
                this.body.setVelocityX(gamePrefs.ARTHUR_SPEED);
                this.setFlipX(false);
                this.anims.play('run',true);
            }
            else if(this.cursores.right.isDown && this.cursores.right.isDown) // RIGHT CROUCHING
            {
                //ME MUEVO A LA DERECHA AGACHADO
                this.body.setVelocityX(gamePrefs.ARTHUR_SPEED_CROUCH);
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
            this.body.blocked.down && //this.body.onFloor()
            Phaser.Input.Keyboard.DownDuration(this.cursores.up,250))
            {
                this.body.setVelocityY(-gamePrefs.ARTHUR_JUMP);            
            }
    
            if(!this.body.onFloor())
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

        //PLAYER HAS NO ARMOUR
        else
        {
            if(this.cursores.left.isDown && !this.cursores.down.isDown) // LEFT NOT CROUCHING
            {
                //ME MUEVO A LA IZQUIERDA
                this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED);
                this.setFlipX(true);
                this.anims.play('runNaked',true);
            }
            
            else if(this.cursores.left.isDown && this.cursores.down.isDown) // LEFT CROUCHING
            {
                //ME MUEVO A LA IZQUIERDA AGACHADO
                this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED_CROUCH);
                this.setFlipX(true);
                this.anims.play('runNaked',true);
            }
            
            else if(this.cursores.right.isDown && !this.cursores.right.isDown) // RIGHT NOT CROUCHING
            {
                //ME MUEVO A LA DERECHA
                this.body.setVelocityX(gamePrefs.ARTHUR_SPEED);
                this.setFlipX(false);
                this.anims.play('runNaked',true);
            }
            else if(this.cursores.right.isDown && this.cursores.right.isDown) // RIGHT CROUCHING
            {
                //ME MUEVO A LA DERECHA AGACHADO
                this.body.setVelocityX(gamePrefs.ARTHUR_SPEED_CROUCH);
                this.setFlipX(false);
                this.anims.play('runNaked',true);
            }else
            {
                //NO ME MUEVO AT ALL
                this.body.setVelocityX(0);
                this.anims.stop().setFrame(18);
            }
            //SALTO
            if(this.cursores.up.isDown &&
            this.body.blocked.down && //this.body.onFloor()
            Phaser.Input.Keyboard.DownDuration(this.cursores.up,250))
            {
                this.body.setVelocityY(-gamePrefs.ARTHUR_JUMP);            
            }
    
            if(!this.body.onFloor())
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


        super.preUpdate(time, delta);
    }
}