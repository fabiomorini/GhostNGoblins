class crowPrefab extends actorPrefab {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'crow') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.direction = -1;
        this.scene = _scene;
        this.sinus = -1;
        this.ascendent = true;
        this.gethit = false;
        
        this.anims.play('crowIdle', true);
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

            console.log(this.body);

        this.isMoving = false;
    }



    hit(_this, _arthur) {
        if (_arthur.isInvincible == false) {
            _arthur.tookDamage = true;
            _arthur.isInvincible = true;
            _arthur.health -= 1;
        }
    }

    checkDistance()
    {
        if(Phaser.Math.Distance.BetweenPoints(this,this.scene.arthur) < 200)
        {
            this.isMoving = true;
            this.anims.play('crowFly', true);
        }
    }

    moveCrow()
    {
        
        if(this.sinus <= -1)
            this.ascendent = true;
        else if( this.sinus >= 1)
            this.ascendent = false;

        if(this.ascendent)
            this.sinus = this.sinus + 0.02;
        else 
            this.sinus = this.sinus - 0.02;


        this.body.setVelocityX(this.direction * gamePrefs.ENEMY_SPEED);
        this.body.velocity.y = gamePrefs.CROW_Y_SPEED * Math.sin(this.sinus);
    }

    preUpdate(time,delta)
    {
        this.checkDistance();

        if(this.isMoving)
        {
            this.moveCrow();
        }

        super.preUpdate(time,delta);
    }

}