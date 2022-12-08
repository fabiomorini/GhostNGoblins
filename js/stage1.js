class stage1 extends Phaser.Scene{
	constructor()
    {
        super({key:'stage1'});
    }
	preload()
    {
        //creación namespace layers
        LAYERS.preload(this);

        this.load.setPath('assets/sprites/Arthur/');
        this.load.spritesheet('arthur','arthur.png',
        {frameWidth:32,frameHeight:32});

        this.load.setPath('assets/sprites/Weapons/');
        this.load.spritesheet('spear','Spear.png',
        {frameWidth:28,frameHeight:6});

        this.load.setPath('assets/sprites/Weapons/');
        this.load.spritesheet('knife','Knife.png',
        {frameWidth:16,frameHeight:8});

        this.load.setPath('assets/sprites/Enemies/');
        this.load.spritesheet('zombie','zombie.png',
        {frameWidth:32,frameHeight:32});
    }

	create()
    {
        //Carga namespace layers
        LAYERS.create(this);

        this.loadAnimations();
        
        //Pintamos al heroe
        this.arthur = new heroPrefab(this,65,100);

        this.physics.add.collider
        (
            this.terrainBorder1F,
            this.arthur
        );

        this.physics.add.collider
        (
            this.terrain1F,
            this.arthur
        );

        this.physics.add.collider
        (
            this.terrain2F,
            this.arthur
        );

        this.physics.add.collider
        (
            this.tombs1F,
            this.arthur
        );

        this.physics.add.collider
        (
            this.tombs2F,
            this.arthur
        );

        this.physics.add.overlap
        (
            this.ladders,
            this.arthur
        );

        this.physics.add.overlap
        (
            this.water,
            this.arthur
        );
            
        this.zombie = new zombiePrefab(this,300,190);

        this.physics.add.collider
        (
            this.terrainBorder1F,
            this.zombie
        );

        this.physics.add.collider
        (
            this.terrain1F,
            this.zombie
        );

        this.physics.add.collider
        (
            this.terrain2F,
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
            repeat:0
        });

        this.anims.create
        ({
            key:'throwCrouch',
            frames:this.anims.generateFrameNumbers('arthur',{start:10,end:11}),
            frameRate:10,
            repeat:0
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
            repeat:0
        });
        
        this.anims.create
        ({
            key:'throwCrouchNaked',
            frames:this.anims.generateFrameNumbers('arthur',{start:26,end:27}),
            frameRate:10,
            repeat:0
        });

        this.anims.create
        ({
            key:'spearIdle',
            frames:this.anims.generateFrameNumbers('spear',{start:0,end:0}),
            frameRate:1,
            repeat:0
        });

        this.anims.create
        ({
            key:'spearIdle',
            frames:this.anims.generateFrameNumbers('knife',{start:0,end:0}),
            frameRate:1,
            repeat:0
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

