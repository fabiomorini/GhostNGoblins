class level1 extends Phaser.Scene{
	constructor()
    {
        super({key:'level1'});
    }
	preload()
    {
        this.load.setPath('assets/tilesets/');
        this.load.image('walls','tileset_walls.png');
        this.load.image('moss','tileset_moss.png');

        this.load.setPath('assets/sprites/');
        this.load.image('bg_green','bg_blue_tile.png');
        this.load.spritesheet('arthur','Arthur/arthur.png',
        {frameWidth:32,frameHeight:32});

        this.load.spritesheet('jumper','jumper.png',
        {frameWidth:32,frameHeight:32});

        this.load.setPath('assets/maps/');
        this.load.tilemapTiledJSON('level1','level1.json');
    }

	create()
    {
    //Pintamos el fondo
    this.bg = this.add.tileSprite(0,0,gamePrefs.LEVEL1_WIDTH,
        gamePrefs.LEVEL1_HEIGHT,'bg_green').setOrigin(0);

    //Pintamos el nivel
    //Cargo el JSON
    this.map = this.add.tilemap('level1');
    //Cargamos los TILESETS
    this.map.addTilesetImage('walls');
    this.map.addTilesetImage('moss');
    //Pintamos las CAPAS/LAYERS
    this.walls = this.map.createLayer('layer_walls','walls');
    this.map.createLayer('layer_moss_top','moss');
    this.map.createLayer('layer_moss_left','moss');
    this.map.createLayer('layer_moss_right','moss');
    this.map.createLayer('layer_moss_bottom','moss');
    this.map.setCollisionByExclusion(-1,true,true,'layer_walls');

    //Pintamos al heroe
    this.arthur = new heroPrefab(this,65,100);

        this.physics.add.collider
        (
            this.walls,
            this.arthur
        );

       this.loadAnimations();

       this.jumper = new jumperPrefab(this,240,304);
       this.physics.add.collider
        (
            this.walls,
            this.jumper
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
            key:'jumper',
            frames:this.anims.generateFrameNumbers('jumper',{start:0,end:3}),
            frameRate:10,
            repeat:-1
        });
        
    }

	update()
    {
    }
}
