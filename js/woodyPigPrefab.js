class woodyPigPrefab extends actorPrefab {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'woodyPig') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.direction = -1;
        this.scene = _scene;
        this.anims.play('woodyPigMove', true);
        this.body.setAllowGravity(false);
        _scene.physics.add.overlap
        (
            this,
            _scene.arthur,
            this.hit,
            null,
            this
        );

        //this.body.setSize(15, 30, true)
    }

    hit(_woodyPig, _arthur) {
        if (_arthur.isInvincible == false) {
            _arthur.tookDamage = true;
            _arthur.isInvincible = true;
            _arthur.health -= 1;
        }
    }

    preUpdate(time, delta) {
        if(this.direction == 1)
            this.setFlipX(true);
        else 
            this.setFlipX(false);

        super.preUpdate(time, delta);
    }


}