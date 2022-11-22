class zombiePrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag='zombie')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
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
        {
            _arthur.health -=1;
            //_arthur.body.velocity.x += gamePrefs.ARTHUR_SPEED * -_arthur.direccion;
            _arthur.body.velocity.y -= Math.sin(0.1) * gamePrefs.ARTHUR_JUMP;
            this.scene.cameras.main.shake(500,0.05);
            this.scene.cameras.main.flash(255,255,255,255);
        }

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
    super.preUpdate(time,delta);
    }

    
}