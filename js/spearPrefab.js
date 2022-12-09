class spearPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_tag='spear')
    {
        super(_scene,_posX,_posY,_tag);
            _scene.add.existing(this); 

        _scene.physics.add.collider
        (
            this,
            _scene.tombs1F,
            this.hasHitTarget
        );

        _scene.physics.add.collider
        (
            this,
            _scene.tombs2F,
            this.hasHitTarget
        );

        _scene.physics.add.collider
        (
            this,
            _scene.zombie,
            this.hasHitTarget
        );

        this.aliveTime = 0;
    }

    hasHitTarget(_this, _zombie)
    {
        _this.setActive(false);
        _this.y += 500;
    }
    
    preUpdate()
    {
        this.aliveTime = this.scene.time.addEvent(
            {
                delay: 1000,
                callback: this.destroy,
                callbackScope: this,
                repeat: 0
            }   
        );
    }
}