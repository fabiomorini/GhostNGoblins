class flyingKnightPrefab extends actorPrefab {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'flyingKnight') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.direction = 1;
        this.scene = _scene;
        this.sinus = -1;
        this.ascendent = true;
        this.anims.play('flyingKnightIddle', true)
        this.body.setAllowGravity(false);
        _scene.physics.add.overlap
            (
                this,
                _scene.arthur,
                this.hit,
                null,
                this
            );
        this.body.setSize(15, 28, true);
    }



    hit(_flyingKnight, _arthur) {
        if (_arthur.isInvincible == false) {
            _arthur.tookDamage = true;
            _arthur.isInvincible = true;
            _arthur.health -= 1;
        }
    }


    preUpdate(time,delta)
    {
        if(this.direction == 1)
            this.setFlipX(true);
        else 
            this.setFlipX(false);

        //Calculo para poder cambiar el movimiento del knight de arriba a abajo
        if(this.sinus <= -1)
            this.ascendent = true;
        else if( this.sinus >= 1)
            this.ascendent = false;

        //Calculo para poder mover el knight de posicion frame a frame.
        if(this.ascendent)
            this.sinus = this.sinus + 0.05;
        else 
            this.sinus = this.sinus - 0.05;


        this.body.setVelocityX(this.direction * gamePrefs.ENEMY_SPEED);
        this.body.velocity.y = gamePrefs.FLYINGKNIGHT_HEIGHT * Math.sin(this.sinus);
    
    super.preUpdate(time,delta);
    }

}