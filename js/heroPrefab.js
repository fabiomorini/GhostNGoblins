class heroPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag='hero')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        //_scene.physics.add.existing(this); 
        this.cursores = _scene.input.keyboard.createCursorKeys();      
    }

    preUpdate(time,delta)
    {
        if(this.cursores.left.isDown && !this.cursores.down.isDown) // LEFT NOT CROUCHING
        {
            this.body.setVelocityX(-gamePrefs.HERO_SPEED);
            this.setFlipX(true);
            this.anims.play('run',true);
        }
        else if(this.cursores.left.isDown && this.cursores.down.isDown) // LEFT CROUCHING
        {
            this.body.setVelocityX(-gamePrefs.HERO_SPEED_CROUCH);
            this.setFlipX(true);
            this.anims.play('run',true);
        }
        else if(this.cursores.right.isDown && !this.cursores.right.isDown) // RIGHT NOT CROUCHING
        {
            this.body.setVelocityX(gamePrefs.HERO_SPEED);
            this.setFlipX(false);
            this.anims.play('run',true);
        }
        else if(this.cursores.right.isDown && this.cursores.right.isDown) // RIGHT CROUCHING
        {
            this.body.setVelocityX(gamePrefs.HERO_SPEED_CROUCH);
            this.setFlipX(false);
            this.anims.play('run',true);
        }

        if(this.cursores.up.isDown && this.body.blocked.down) // CLIMB STAIRS || JUMP
        {
            //TODO
            // if(player.isJumping())
            // else if(player.isClimbingStairs)

            Phaser.Input.Keyboard.DownDuration(this.cursores.up,250)
            {
                this.body.setVelocityY(-gamePrefs.HERO_JUMP);            
            }
        }
        
       

        if(!this.body.onFloor())
        {
            this.anims.stop().setFrame(6);
        }


        super.preUpdate(time, delta);
    }
}