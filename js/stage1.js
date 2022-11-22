class stage1 extends Phaser.Scene{
	constructor()
    {
        super({key:'stage1'});
    }
	preload()
    {
        this.load.setPath('assets/tilesets/');
        this.load.image('terrain','graveyardTerrain.png');
        this.load.image('mountain','mountain01.png');

        this.load.setPath('assets/map/'); 
        this.load.image('bg_fake','NES - Ghosts n Goblins - Stage 1.png');

        this.load.setPath('assets/sprites/Arthur/');
        this.load.spritesheet('arthur','arthur.png',
        {frameWidth:32,frameHeight:32});

        this.load.setPath('assets/sprites/Enemies/');
        this.load.spritesheet('zombie','zombie.png',
        {frameWidth:32,frameHeight:32});

        this.load.setPath('assets/map/');
        this.load.tilemapTiledJSON('stage1','stage1.json');
        this.load.json('json','stage1.json');
    }

	create()
    {
    //Pintamos el fondo
    this.bg = this.add.tileSprite(0,0,gamePrefs.LEVEL1_WIDTH,
        gamePrefs.LEVEL1_HEIGHT,'bg_fake').setOrigin(0);

    //Pintamos el nivel
    //Cargo el JSON
    this.map = this.add.tilemap('stage1');
    //Cargamos los TILESETS
    this.map.addTilesetImage('terrain');
    this.map.addTilesetImage('mountain');
    //Pintamos las CAPAS/LAYERS
    this.walls = this.map.createLayer('Terrain Layer','terrain');
    this.map.createLayer('Mountain Layer','mountain');

    this.map.setCollisionByExclusion(-1,true,true,'Terrain Layer');

    //Pintamos al heroe
    this.arthur = new heroPrefab(this,65,100);

        this.physics.add.collider
        (
            this.walls,
            this.arthur
        );

       this.loadAnimations();

        this.zombie = new zombiePrefab(this,300,190);
        this.physics.add.collider
         (
             this.walls,
             this.zombie
         );

        this.cameras.main.startFollow(this.arthur);
        this.cameras.main.setBounds(0,0,gamePrefs.LEVEL1_WIDTH,gamePrefs.LEVEL1_HEIGHT);
    }


    loadAnimations()
    {
        
        this.anims.create
        ({
            key:'run',
            frames:this.anims.generateFrameNumbers('arthur',{start:0,end:4}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create
        ({
            key:'throw',
            frames:this.anims.generateFrameNumbers('arthur',{start:8,end:9}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create
        ({
            key:'throwCrouch',
            frames:this.anims.generateFrameNumbers('arthur',{start:10,end:11}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create
        ({
            key:'runNaked',
            frames:this.anims.generateFrameNumbers('arthur',{start:16,end:20}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create
        ({
            key:'throwNaked',
            frames:this.anims.generateFrameNumbers('arthur',{start:24,end:25}),
            frameRate:10,
            repeat:-1
        });
        
        this.anims.create
        ({
            key:'throwCrouchNaked',
            frames:this.anims.generateFrameNumbers('arthur',{start:26,end:27}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create
        ({
            key:'zombieSpawn',
            frames:this.anims.generateFrameNumbers('zombie',{start:0,end:2}),
            frameRate:5,
            repeat:0
        });

        this.anims.create
        ({
            key:'zombieRun',
            frames:this.anims.generateFrameNumbers('zombie',{start:3,end:5}),
            frameRate:5,
            repeat:-1
        });
        
    }

	update()
    {
    }
}

