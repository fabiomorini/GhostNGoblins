class stage1 extends Phaser.Scene {
    constructor() 
    {
        super({ key: 'stage1' });
    }
    
    preload()
    {
        this.load.setPath('assets/sprites/Arthur/');
        this.load.spritesheet('arthur','arthur.png',
        {frameWidth:32,frameHeight:32});

        this.load.setPath('assets/sprites/Enemies/');
        this.load.spritesheet('zombie','zombie.png',
        {frameWidth:32,frameHeight:32});
        this.load.spritesheet('greenMonster', 'green_monster.png',
        {frameWidth:16,frameHeight:32});

        this.load.setPath('assets/sprites/Weapons/');
        this.load.image("spear", "Spear.png");
        this.load.image("knife", "Knife.png");
        this.load.spritesheet("fire", "Fire projectile animation.png",
        {frameWidth:32,frameHeight:16});

        this.load.setPath('assets/sprites/Enemies/');
        this.load.spritesheet("greenMonsterBullet", "greenMonsterBullet.png",
        {frameWidth:32,frameHeight:32});
    }

	create()
    {
        //Carga namespace layers
        LAYERS.create(this);

        this.loadAnimations();

        //Pintamos al player
        this.arthur = new playerPrefab(this, 65, 100);

        //Pintamos los enemigos
        this.zombie = new zombiePrefab(this, 300, 190);
        this.greenMonster = new greenMonsterPrefab(this, 500, 190);

        //Camaras
        this.cameras.main.startFollow(this.arthur);
        this.cameras.main.setBounds(0, 0, gamePrefs.LEVEL1_WIDTH, gamePrefs.LEVEL1_HEIGHT);

        

        console.log(this);
    }

    update()
    {
        if (this.tombs1F.culledTiles.length > 0) {
            var tiles = this.tombs1F;

            //console.log(tiles);
            //tiles.tileSet.setCollisionBounds(8,8,8,8);
            //for (var i = 0; i < tiles.length; i++) {
            //}
        }
    }

    loadAnimations() {
        //ARTHUR ARMOUR ANIMATIONS
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('arthur', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('arthur', { start: 32, end: 43 }),
            frameRate: 10,
            repeat: 0
        })

        this.anims.create({
            key: 'throw',
            frames: this.anims.generateFrameNumbers('arthur', { start: 8, end: 9 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'throwCrouch',
            frames: this.anims.generateFrameNumbers('arthur', { start: 10, end: 11 }),
            frameRate: 10,
            repeat: 0
        });

        //ARTHUR NAKED ANIMATIONS
        this.anims.create({
            key: 'runNaked',
            frames: this.anims.generateFrameNumbers('arthur', { start: 16, end: 20 }),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'throwNaked',
            frames: this.anims.generateFrameNumbers('arthur', { start: 24, end: 25 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'throwCrouchNaked',
            frames: this.anims.generateFrameNumbers('arthur', { start: 26, end: 27 }),
            frameRate: 10,
            repeat: 0
        });
        //FIRE ANIMATION
        this.anims.create
        ({
            key:'throwFire',
            frames:this.anims.generateFrameNumbers('fire',{start:0,end:3}),
            frameRate:8,
            repeat:-1
        });

        //ZOMBIE ANIMATIONS
        this.anims.create({
            key: 'zombieSpawn',
            frames: this.anims.generateFrameNumbers('zombie', { start: 1, end: 3 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'zombieRun',
            frames: this.anims.generateFrameNumbers('zombie', { start: 4, end: 5 }),
            frameRate: 5,
            repeat: -1
        });

        //GREEN MONSTER ANIMATIONS
        this.anims.create({
            key: 'greenMonsterIddle',
            frames: this.anims.generateFrameNumbers('greenMonster', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'greenMonsterAttack',
            frames: this.anims.generateFrameNumbers('greenMonster', { start: 2, end: 5 }),
            frameRate: 5,
            repeat: 0
        })

        //GREEN MONSTER BULLET
        this.anims.create
        ({
            key: 'greenMonsterBullet',
            frames: this.anims.generateFrameNumbers('greenMonsterBullet', {start:0, end:3}),
            frameRate:5,
            repeat: -1
        })

        this.anims.create({
            key: 'breakArmour',
            frames: this.anims.generateFrameNumbers('break_armour', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 0
        })

    }
}

