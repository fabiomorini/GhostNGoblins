class jumperPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag = 'jumper')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.scene = _scene;
        this.anims.play('jumper', true);
        this.direction = 1;
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED);

        _scene.physics.add.overlap(
            this, 
            _scene.hero, 
            this.hit,
            null,
            this
            )
    }

    hit(_jumper, _hero)
    {
        if(_jumper.body.touching.up && _hero.body.touching.down)
        {
            this.destroy();
            _hero.body.setVelocityY(-gamePrefs.HERO_JUMP);
        }

        else
        {
            _hero.body.reset(65, 100);
            this.scene.cameras.main.shake(500,0,0.05);
            this.scene.cameras.main.flash(500,255,0,0);
        }
    }

    preUpdate(time,delta)
    {
        if(this.body.blocked.right || this.body.blocked.left){
            this.direction *= -1;
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED) * this.direction;
            this.flipX = !this.flipX;
        }

        super.preUpdate(time, delta);
    }
}