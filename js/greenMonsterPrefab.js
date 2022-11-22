class greenMonsterPrefab extends Phaser.GameObjects.Sprite
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
                delay:800, //ms
                callback:this.makeRandom,
                callbackScope: this,
                loop: true
            } 
        );
    }



    hit(_greenMonster,_arthur)
    {
        {
            _arthur.health -=1;
            //_arthur.body.velocity.x += gamePrefs.ARTHUR_SPEED * -_arthur.direccion;
            _arthur.body.velocity.y -= Math.sin(0.1) * gamePrefs.ARTHUR_JUMP;
            this.scene.cameras.main.shake(500,0.05);
            this.scene.cameras.main.flash(500,255,0,0);
        }

    }

    preUpdate(time,delta)
    {
                
        if(this.randNum == 1)
            this.anims.play('greenMonsterIddle', true);
        
        else if(this.randNum == 3)
        {
            this.anims.play('greenMonsterAttack', true);
            this.anims.nextAnim = 'greenMonsterIddle';
        }
        else
            this.anims.stop().setFrame(0);
    
    super.preUpdate(time,delta);
    }

    //THIS FUNCTION GETS CALLED BY THE TIMER EVERY 0.8SEC USED BY THE GREEN MOSTER TO DECIDE IF HE SHOOTS OR NOT. 
    //TRIED TO REPLICATE THE SAME BEHAVIOUR AS HE HAS IN THE OG GAME.
    makeRandom(min, max)
    {
        this.randNum = Phaser.Math.Between(0, 3);
    }
}