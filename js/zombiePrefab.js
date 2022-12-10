class zombiePrefab extends actorPrefab
{
    constructor(_scene,_positionX,_positionY,_spriteTag='zombie')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.startingPos = _positionX;
        this.dist = 0;
        this.maxDistance = 200;
        this.anims.play('zombieSpawn',true);
        this.anims.nextAnim = 'zombieRun';
        this.direccion = -1;
        this.isSpawning = false;
        this.scene = _scene;
        _scene.physics.add.overlap
        (
            this,
            _scene.arthur,
            this.hit,
            null,
            this
        );        
            
    }

    hit(_zombie,_arthur)
    {
        _arthur.health -=1;
        _arthur.body.reset(65,100);
        this.scene.cameras.main.shake(500,0.05);
        this.scene.cameras.main.flash(500,255,0,0);
    }

    preUpdate(time,delta)
    {
        if(this.anims.currentAnim.key !='zombieSpawn')
        {
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED*this.direccion);
        }
        if(this.body.blocked.right || this.body.blocked.left)
        {
            this.direccion *=-1;
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED*this.direccion);
            this.flipX = !this.flipX;
        }
        
        this.dist = Phaser.Math.Distance.Between(this.body.position.x,0,this.startingPos,0)
        console.log(this.body.position.x);
        //console.log(this.startingPos);

        if(this.dist > this.maxDistance)
        {
            this.anims.playReverse("zombieSpawn", true);
            this.on(Phaser.Animations.Events.ANIMATION_COMPLETE,  this.anims.stop().setFrame(18) )
            this.body.position.x(-800);

        }   

    super.preUpdate(time,delta);
    }

    resetPosition()
    {
        this.body.position.x = startingPos;
    }
    
}