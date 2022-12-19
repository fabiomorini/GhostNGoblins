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

        _scene.physics.add.collider
        (
            this,
            _scene.greenMonster,
            this.hasHitTarget
        );
        _scene.physics.add.collider
        (
            this,
            _scene.flyingKnight,
            this.hasHitTarget
        );

        this.aliveTime = 0;
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
        var d_a1 = new enemyDeathPrefab(_this.scene, _zombie.body.position.x, _zombie.body.position.y);
        _zombie.destroy();
    }

    hasHitTarget(_this, _greenMonster)
    {
        _this.setActive(false);
        _this.y += 500;
        var d_a2 = new enemyDeathPrefab(_this.scene, _greenMonster.body.position.x, _greenMonster.body.position.y);
        _greenMonster.destroy();
    }

    hasHitTarget(_this, _flyingKnight)
    {
        _this.setActive(false);
        _this.y += 500;
        var d_a3 = new enemyDeathPrefab(_this.scene, _flyingKnight.body.position.x, _flyingKnight.body.position.y);
        _flyingKnight.destroy();
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