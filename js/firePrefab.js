class firePrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_tag='fire')
    {
        super(_scene,_posX,_posY,_tag);
            _scene.add.existing(this); 

        _scene.physics.add.collider
        (
            this,
            [_scene.tombs1F,
             _scene.tombs2F],
            this.hasHitTomb
        );

        _scene.physics.add.collider
        (
            this,
            [_scene.terrain2F, 
             _scene.terrainBorder1F,
             _scene.terrain1F],
            this.hasHitNull
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
        this.anims.play("throwFire");
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

    hasHitTarget(_this, _enemy)
    {
        _this.setActive(false);
        _this.y += 500;
        _this.scene.sound.play('enemyDeath');
        _enemy.destroy();
    }
    
    preUpdate(time, delta)
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