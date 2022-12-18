class greenMonsterBulletPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_tag='greenMonsterBullet')
    {
        super(_scene,_posX,_posY,_tag);
            _scene.add.existing(this); 


        _scene.physics.add.overlap
        (
            this,
            _scene.arthur,
            this.hit,
            null,
            this
        );        
    }

    hit(_this,_arthur)
    {
        _arthur.health -=1;
        _arthur.body.reset(65,100);
        this.scene.cameras.main.shake(500,0.05);
        this.scene.cameras.main.flash(500,255,0,0);
    }
    
    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
}