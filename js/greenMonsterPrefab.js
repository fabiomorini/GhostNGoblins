class greenMonsterPrefab extends actorPrefab
{
    constructor(_scene,_positionX,_positionY,_spriteTag='greenMonster')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.direccion = -1;
        this.scene = _scene;
        this.anims.stop().setFrame(0);
        this.randNum = 0;
        this.number = 0;
        _scene.physics.add.overlap
        (
            this,
            _scene.arthur,
            this.hit,
            null,
            this
        );    
        var numberTimer = _scene.time.addEvent
        (
            {
                delay:2000, //ms
                callback:this.makeRandom,
                callbackScope: this,
                loop: true
            } 
        );

        this.loadPools();
    }



    hit(_greenMonster,_arthur)
    {
        {
            _arthur.health -=1;
            //_arthur.body.velocity.x += gamePrefs.ARTHUR_SPEED * -_arthur.direccion;
            _arthur.body.velocity.y -= Math.sin(0.1) * gamePrefs.ARTHUR_JUMP;
            this.scene.cameras.main.shake(500,0.05);
        }

    }

    loadPools()
    {
        this.bullet = this.scene.physics.add.group();
    }


    /*

        PREGUNTAR AL RICHARD POR QUE A VECES SI QUE FUNCIONA EL THIS.ON() (ZOMBIE) PERO OTRAS NO, GREENMONSTER / PLAYER.

    */
    preUpdate(time,delta)
    {
        if(Phaser.Math.Distance.BetweenPoints(this,this.scene.arthur) < 200)
        {
            if(this.randNum == 1)
            {
                this.anims.play('greenMonsterIddle', true);
            }
            else if(this.randNum == 3)
            {
                this.anims.play('greenMonsterAttack', true);
                this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=> {
                    this.anims.stop();
                    this.attack();
                });
    
            }
            else
            this.anims.stop().setFrame(0);
        }        
    
    super.preUpdate(time,delta);
    }

    //THIS FUNCTION GETS CALLED BY THE TIMER EVERY 0.8SEC USED BY THE GREEN MOSTER TO DECIDE IF HE SHOOTS OR NOT. 
    //TRIED TO REPLICATE THE SAME BEHAVIOUR AS HE HAS IN THE OG GAME.
    makeRandom(min, max)
    {
        this.randNum = Phaser.Math.Between(0, 3);
    }
    attack()
    {
        //Throw projectile
        var _bullet = this.bullet.getFirst(false);

        _bullet = new greenMonsterBulletPrefab(this.scene, this.x, this.y);
        this.bullet.add(_bullet);

        _bullet.body.setSize(8,8);
        _bullet.body.allowGravity = false;

        _bullet.play("greenMonsterBullet")

        var angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.arthur.x, this.scene.arthur.y)

        var speed_x = 120 * Math.cos(angle); 
        var speed_y = 120 * Math.sin(angle);

        _bullet.body.setVelocityX(speed_x);
        _bullet.body.setVelocityY(speed_y);

        //reset animation to iddle
        this.anims.stop().setFrame(0);
    }
}