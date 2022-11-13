class jumperPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag='jumper')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.anims.play('jumper',true);
        this.direccion = 1;
        this.scene = _scene;
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED*this.direccion);
        _scene.physics.add.overlap
        (
            this,
            _scene.arthur,
            this.hit,
            null,
            this
        );        
    }

    hit(_jumper,_arthur)
    {
        {
            _arthur.health -=1;
            _arthur.body.reset(65,100);
            this.scene.cameras.main.shake(500,0.05);
            this.scene.cameras.main.flash(500,255,0,0);
        }

    }

    preUpdate(time,delta)
    {
        if(this.body.blocked.right || this.body.blocked.left)
        {
            this.direccion *=-1;
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED*this.direccion);
            this.flipX = !this.flipX;
        }
    super.preUpdate(time,delta);
    }
}