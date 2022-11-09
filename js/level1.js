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
        this.load.image('bg_green','bg_green_tile.png');
        this.load.image('puerta','spr_door_open_0.png');

        this.load.spritesheet('hero','hero.png',
        {frameWidth:32, frameHeight:32});

        this.load.spritesheet('jumper','jumper.png',
        {frameWidth:32, frameHeight:32});

        this.load.setPath('assets/maps/');
        this.load.tilemapTiledJSON('level1','level1.json');
    }

    create()
    {
        //Pintamos el fondo
        this.bg = this.add.tileSprite(0,0,gamePrefs.LEVEL1_HEIGHT,
        gamePrefs.LEVEL1_WIDTH,'bg_green').setOrigin(0);

        //Pintamos el nivel
        //Cargar el JSON
        this.map = this.add.tilemap('level1')

        //Cargar tilesets
        this.map.addTilesetImage('walls');
        this.map.addTilesetImage('moss');
        
        //Pintar capas/layers
        this.walls = this.map.createLayer('layer_walls','walls');
        this.map.createLayer('layer_moss_top','moss');
        this.map.createLayer('layer_moss_down','moss');
        this.map.createLayer('layer_moss_right','moss');
        this.map.createLayer('layer_moss_right','moss');

        // this.map.setCollisionBetween(1,11,true,true,'layer_walls');
        this.map.setCollisionByExclusion(-1,true,true,'layer_walls');

        //Pintamos puerta
        this.puerta = this.physics.add.sprite(65,268,'puerta');
        this.puerta.body.allowGravity = false;
        this.puerta.body.setImmovable(true);

        //Pintamos heroe
        this.hero = new heroPrefab(this,65,100);
        
        //Colisiones
        this.physics.add.collider
        (
            this.walls,
            this.hero
        );

        this.physics.add.collider
        (
            this.walls,
            this.jumper
        );

        //Control de camara
        this.cameras.main.startFollow(this.hero);
        this.cameras.main.setBounds(0,0,gamePrefs.LEVEL1_WIDTH, gamePrefs.LEVEL1_HEIGHT);

        //Cargamos las animaciones
        this.loadAnimations();

        //Creamos al jumper enemigo
        this.jumper = new jumperPrefab(this, 240, 304);

        //#region Colisiones comentadas
            // this.physics.add.collider
            // (
            //     this.puerta,
            //     this.hero,
            //     // this.killEnemy,
            //     // null,
            //     // this
            // );

            // this.physics.add.overlap
            // (
            //     this.bulletPool,
            //     this.enemyPool,
            //     this.killEnemy,
            //     null,
            //     this
            // );

            // this.physics.add.overlap
            // (
            //     this.nave,
            //     this.powerUps,
            //     this.pickPowerUp,
            //     null,
            //     this
            // );
        //#endregion Colisiones comentadas
        
        //#region Otros comentarios
            // this.cursores.space.on
            // (
            // 'up',
            // function()
            // {
            //     this.createBullet();            
            // },
            // this
            // );
            /*
            this.shootingTimer = this.time.addEvent(
            {
                delay: 1000,
                callback: this.createBullet,
                callbackScope: this,
                repeat: -1
            });
            */
            // this.enemyTimer = this.time.addEvent
            // (
            //     {
            //         delay:2000, //ms
            //         callback:this.createEnemy,
            //         callbackScope:this,
            //         repeat: -1
            //     }
            // );

            // killEnemy(_bullet,_enemy)
            // {
            //     _bullet.setActive(false);
            //     _bullet.x = -100;
            //     _enemy.health--;
            //     if(_enemy.health>0)
            //     {
            //         //invulnerabilidad por X segundos
            //     }else
            //     {
                    
            //         this.time.removeEvent(_enemy.shootingTimer);
            //         var rnd = Phaser.Math.Between(1,1); //20% de posibilidades de generar un powerUp
            //         if(rnd==1)
            //         {
            //             var tipo = Phaser.Math.Between(1,1);
            //             this.createPowerUp(_enemy.body.x,_enemy.body.y,tipo);
            //         }
            //         _enemy.setActive(false);
            //         _enemy.x = -100;
            //     }
            // }

            // createEnemy()
            // {
            //     var _enemy = this.enemyPool.getFirst(false);  //Buscamos en el pool de enemigos si hay alguna reutilizable
            //     var posX = Phaser.Math.Between(16,config.width-16);
            //     var posY = -16;
            //     if(!_enemy)
            //     {//No hay
            //         console.log('Create Enemy');            
            //         _enemy = new enemyPrefab(this,posX,posY,'enemy');
            //         this.enemyPool.add(_enemy);
            //     }else
            //     {//Si hay
            //         console.log('Reset Enemy');
            //         _enemy.active = true;
            //         _enemy.body.reset(posX,posY);
            //         _enemy.health=2;
            //     }
            //     //Sea un enemigo nuevo o uno reutilizable, le damos velocidad
            //     _enemy.body.setVelocityY(gamePrefs.SPEED_ENEMY);

            //     var rnd = Phaser.Math.Between(2,6);
            //     _enemy.shootingTimer = this.time.addEvent
            //     ({
            //         delay:rnd*1000,
            //         callback:this.createEnemyBullet,
            //         args:[_enemy],
            //         callbackScope:this,
            //         repeat:-1
            //     });

            // }

            // createBullet()
            // {
            //     var _bullet = this.bulletPool.getFirst(false);
            //     if(!_bullet)
            //     {
            //         console.log('create bullet');
            //         _bullet = new bulletPrefab(this,this.nave.x,this.nave.y);
            //         this.bulletPool.add(_bullet);
            //     }else
            //     {
            //         console.log('reset bullet');
            //         _bullet.active = true;
            //         _bullet.body.reset(this.nave.x,this.nave.y);
            //     }
            //     //Le doy velocidad
            //     _bullet.body.setVelocityY(gamePrefs.SPEED_BULLET);
            // }

            // createEnemyBullet(_enemy)
            // {
            //     var _bullet = this.enemyBulletPool.getFirst(false);
            //     if(!_bullet)
            //     {
            //         console.log('create bullet');
            //         _bullet = new bulletPrefab(this,_enemy.x,_enemy.y,'enemy_bullet');
            //         this.enemyBulletPool.add(_bullet);
            //     }else
            //     {
            //         console.log('reset bullet');
            //         _bullet.active = true;
            //         _bullet.body.reset(_enemy.x,_enemy.y);
            //     }
            //     //Le doy velocidad
            //     _bullet.body.setVelocityY(gamePrefs.SPEED_ENEMYBULLET);
            // }

            // loadPools()
            // {
            //     this.bulletPool = this.physics.add.group();
            //     this.enemyBulletPool = this.physics.add.group();
            //     this.enemyPool = this.physics.add.group();
            //     this.powerUps = this.physics.add.group();
            // }
        //#endregion Otros comentarios
    }

    loadAnimations()
    {
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('hero', { start: 2, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jumper',
            frames: this.anims.generateFrameNumbers('jumper', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update()
    {

    }
}
