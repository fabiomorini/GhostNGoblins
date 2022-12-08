class playerSpear extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag='spear',_direction)
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
    }
    preUpdate(time,delta){
        this.body.setVelocityX(gamePrefs.SPEAR_SPEED_ * _direction);
    }
}

class playerKnife extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag='knife',_direction)
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
    }
    preUpdate(time,delta){
        this.body.setVelocityX(gamePrefs.SPEAR_SPEED_ * _direction);
    }
}

class playerFire extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag='fire',_direction)
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);

        this.animations.add('idle', [0,1],10,true);
        this.animations.play('idle');
    }
    preUpdate(time,delta){
        this.body.setVelocityX(gamePrefs.SPEAR_SPEED_ * _direction);
        this.body.setVelocityY(gamePrefs.SPEAR_SPEED_ * _direction);
    }
}