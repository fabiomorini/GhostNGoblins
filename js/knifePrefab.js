class knifePrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_tag='knife')
    {
        super(_scene,_posX,_posY,_tag);
            _scene.add.existing(this); 

        _scene.physics.add.collider
        (
            this,
            _scene.tombs1F,
            this.hasHitTomb
        );

        _scene.physics.add.collider
        (
            this,
            _scene.tombs2F,
            this.hasHitTomb
        );

        _scene.physics.add.collider
        (
            this,
            _scene.zombie,
            this.hasHitTarget
        );

        _scene.physics.add.collider
        (
            this,
            _scene.greenMonster,
            this.hasHitTarget
        );

        this.aliveTime = 0;
    }

    hasHitTomb(_this, _tomb)
    {
        _this.setActive(false);
        _this.y += 500;
        _this.scene.sound.play('projectileBlock');
    }

    hasHitNull(_this, _null)
    {
        _this.setActive(false);
        _this.y += 500;
    }

    hasHitTarget(_this, _zombie)
    {
        _this.setActive(false);
        _this.y += 500;
        _this.scene.sound.play('enemyDeath');
        _zombie.destroy();
    }

    hasHitTarget(_this, _greenMonster)
    {
        _this.setActive(false);
        _this.y += 500;
        _this.scene.sound.play('enemyDeath');
        _greenMonster.destroy();
    }
    
    preUpdate(time,delta)
    {
        this.aliveTime = this.scene.time.addEvent(
            {
                delay: 1000,
                callback: this.destroy,
                callbackScope: this,
                repeat: 0
            }   
        );

        super.preUpdate(time, delta);
    }
}