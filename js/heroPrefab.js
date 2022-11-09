class heroPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag = 'hero')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        //_scene.physics.add.existing(this);

        this.cursores = _scene.input.keyboard.createCursorKeys();
    }

    preUpdate(time,delta)
    {
        if(this.cursores.left.isDown)
        {
            //Moverse a la izquierda
            this.body.setVelocityX(-gamePrefs.HERO_SPEED);
            this.setFlipX(true);
            this.anims.play('run', true);
        }

        else if(this.cursores.right.isDown)
        {
            //Moverse a la derecha
            this.body.setVelocityX(gamePrefs.HERO_SPEED);
            this.setFlipX(false);
            this.anims.play('run', true);
        }

        else
        {
            //No se mueve
            this.body.setVelocityX(0);
            //this.setFrame(0);
            this.anims.stop().setFrame(0);
        }

        //Saltar
        if(this.cursores.up.isDown && this.body.blocked.dawn && //this.body.onFloor()
            Phaser.input.keyboard.DownDuration(this.cursores.up, 250))
        {
            this.body.setVelocityY(-gamePrefs.HERO_JUMP);
        }

        if(!this.body.onFloor())
        {
            this.anims.stop().setFrame(6);
        }

        super.preUpdate(time, delta);
    }
}