class stage1 extends Phaser.Scene {
    constructor() 
    {
        super({ key: 'stage1' });
    }
    
    preload()
    {
        
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
        this.flyingKnight = new flyingKnightPrefab(this, 400, 100);
        this.crow = new crowPrefab(this, 400, 160);

        //Pintamos las tumbas
        this.tombs = new Array(
            new tombPrefab(this, 1*32+16+1, 5*32+16+1),
            new tombPrefab(this, 7*32+16+1, 5*32+16+1, "tomb02"),
            new tombPrefab(this, 12*32+16+1, 5*32+16+1),
            new tombPrefab(this, 16*32+16+1, 5*32+16+1),
            new tombPrefab(this, 23*32+16+1, 5*32+16+1),
            new tombPrefab(this, 30*32+16+1, 5*32+16+1),
            new tombPrefab(this, 34*32+16+1, 5*32+16+1),
            new tombPrefab(this, 39*32+16+1, 5*32+16+1),
            new tombPrefab(this, 46*32+16+1, 5*32+16+1),
            new tombPrefab(this, 23*32+16+16, 2*32+16+17),
            new tombPrefab(this, 26*32+16+16, 2*32+16+17),
            new tombPrefab(this, 29*32+16+16, 2*32+16+17));

        //Camaras
        this.cameras.main.startFollow(this.arthur);
        this.cameras.main.setBounds(0, 0, gamePrefs.LEVEL1_WIDTH, gamePrefs.LEVEL1_HEIGHT);
        
        //TMP mecago en todo q   uew molestO A WDOAWIDHAW
        this.sound.volume = 1;

        this.gameStart = this.sound.add('gameStart');
        this.gameTheme = this.sound.add('gameTheme');
        //this.sound.
        
        this.gameStart.play();
        this.hasPlayed = false;
    }

    update()
    {
        if(!this.gameStart.isPlaying && !this.hasPlayed)
        {
            this.gameTheme.play()
            this.gameTheme.setLoop(true);
            this.hasPlayed = true;
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

        this.anims.create({
            key: 'flyingKnightIddle',
            frames: this.anims.generateFrameNumbers('flyingKnight', { start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'enemyDeath',
            frames: this.anims.generateFrameNumbers('enemy_death', { start: 0, end: 7}),
            frameRate: 10,
            repeat: 0
        })

        //  CROW ANIMATIONS
        this.anims.create({
            key: 'crowIdle',
            frames: this.anims.generateFrameNumbers('crow', { start: 0, end: 3}),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'crowFly',
            frames: this.anims.generateFrameNumbers('crow', { start: 4, end: 7}),
            frameRate: 8,
            repeat: -1
        })
    }
}
