class stage1 extends Phaser.Scene {
  constructor() {
    super({ key: "stage1" });
  }

  preload() {}

  create() {
    //Carga namespace layers
    LAYERS.create(this);

    this.loadAnimations();

    //Pintamos al player
    this.arthur = new playerPrefab(this, 65, 100);

    //Preparamos el spawner de enemigos
    this.enemiesSpawned = [];
    this.enemiesWaiting = {};

    //Pintamos las tumbas
    this.tombs = new Array(
      new tombPrefab(this, 1 * 32 + 16 + 1, 5 * 32 + 16 + 1),
      new tombPrefab(this, 7 * 32 + 16 + 1, 5 * 32 + 16 + 1, "tomb02"),
      new tombPrefab(this, 12 * 32 + 16 + 1, 5 * 32 + 16 + 1),
      new tombPrefab(this, 16 * 32 + 16 + 1, 5 * 32 + 16 + 1, "tomb03"),
      new tombPrefab(this, 23 * 32 + 16 + 1, 5 * 32 + 16 + 1),
      new tombPrefab(this, 30 * 32 + 16 + 1, 5 * 32 + 16 + 1),
      new tombPrefab(this, 34 * 32 + 16 + 1, 5 * 32 + 16 + 1),
      new tombPrefab(this, 39 * 32 + 16 + 1, 5 * 32 + 16 + 1, "tomb02"),
      new tombPrefab(this, 46 * 32 + 16 + 1, 5 * 32 + 16 + 1, "tomb03"),
      new tombPrefab(this, 23 * 32 + 16 + 16, 2 * 32 + 16 + 17, "tomb02"),
      new tombPrefab(this, 26 * 32 + 16 + 16, 2 * 32 + 16 + 17, "tomb03"),
      new tombPrefab(this, 29 * 32 + 16 + 16, 2 * 32 + 16 + 17, "tomb03")
    );

    //Camaras
    this.cameras.main.startFollow(this.arthur);
    this.cameras.main.setBounds(
      0,
      0,
      gamePrefs.LEVEL1_WIDTH,
      gamePrefs.LEVEL1_HEIGHT
    );

    //TMP mecago en todo q   uew molestO A WDOAWIDHAW
    this.sound.volume = 0;

    this.gameStart = this.sound.add("gameStart");
    this.gameTheme = this.sound.add("gameTheme");

    this.gameStart.play();
    this.hasPlayed = false;

    //Comprobamos si todas las tiles necesarias para no colisionar
    //con la parte de abajo y laterales del segundo piso de la montaña
    //han sido modificadas
    this.allMountainCollisionsAreModified = false;
  }

  update() {
    if (!this.gameStart.isPlaying && !this.hasPlayed) {
      this.gameTheme.play();
      this.gameTheme.setLoop(true);
      this.hasPlayed = true;
    }

    //Pintamos los enemigos
    this.spawnEnemies();
    this.checkEnemyDistance();
  }
  
    inputScene()
    {
        this.scene.start('InputScene');
    }

  loadAnimations() {
    //ARTHUR ARMOUR ANIMATIONS
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("arthur", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "die",
      frames: this.anims.generateFrameNumbers("arthur", { start: 32, end: 43 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "throw",
      frames: this.anims.generateFrameNumbers("arthur", { start: 8, end: 9 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "throwCrouch",
      frames: this.anims.generateFrameNumbers("arthur", { start: 10, end: 11 }),
      frameRate: 10,
      repeat: 0,
    });

    //ARTHUR NAKED ANIMATIONS
    this.anims.create({
      key: "runNaked",
      frames: this.anims.generateFrameNumbers("arthur", { start: 16, end: 20 }),
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "throwNaked",
      frames: this.anims.generateFrameNumbers("arthur", { start: 24, end: 25 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "throwCrouchNaked",
      frames: this.anims.generateFrameNumbers("arthur", { start: 26, end: 27 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "breakArmour",
      frames: this.anims.generateFrameNumbers("break_armour", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "laddersAnimation",
      frames: this.anims.generateFrameNumbers("ladders_animation", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "laddersAnimationNaked",
      frames: this.anims.generateFrameNumbers("ladders_animation_naked", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //FIRE ANIMATION
    this.anims.create({
      key: "throwFire",
      frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    //ZOMBIE ANIMATIONS
    this.anims.create({
      key: "zombieSpawn",
      frames: this.anims.generateFrameNumbers("zombie", { start: 1, end: 3 }),
      frameRate: 5,
      repeat: 0,
    });

    this.anims.create({
      key: "zombieRun",
      frames: this.anims.generateFrameNumbers("zombie", { start: 4, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    //GREEN MONSTER ANIMATIONS
    this.anims.create({
      key: "greenMonsterIddle",
      frames: this.anims.generateFrameNumbers("greenMonster", {
        start: 0,
        end: 1,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "greenMonsterAttack",
      frames: this.anims.generateFrameNumbers("greenMonster", {
        start: 2,
        end: 5,
      }),
      frameRate: 5,
      repeat: 0,
    });

    //GREEN MONSTER BULLET
    this.anims.create({
      key: "greenMonsterBullet",
      frames: this.anims.generateFrameNumbers("greenMonsterBullet", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    //FLYING KNIGHT
    this.anims.create({
      key: "flyingKnightIddle",
      frames: this.anims.generateFrameNumbers("flyingKnight", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    //WOODY PIG
    this.anims.create({
      key: "woodyPigMove",
      frames: this.anims.generateFrameNumbers("woodyPig", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "woodyPigTurn",
      frames: this.anims.generateFrameNumbers("woodyPig", { start: 2, end: 3 }),
      frameRate: 5,
      repeat: 0,
    });

    this.anims.create({
      key: "enemyDeath",
      frames: this.anims.generateFrameNumbers("enemy_death", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: 0,
    });

    //  CROW ANIMATIONS
    this.anims.create({
      key: "crowIdle",
      frames: this.anims.generateFrameNumbers("crow", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "crowFly",
      frames: this.anims.generateFrameNumbers("crow", { start: 4, end: 7 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "unicornWalk",
      frames: this.anims.generateFrameNumbers("unicorn", { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "unicornRun",
      frames: this.anims.generateFrameNumbers("unicorn", { start: 3, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "unicornBullet",
      frames: this.anims.generateFrameNumbers("unicornBullet", {
        start: 0,
        end: 1,
      }),
      frameRate: 5,
      repeat: -1,
    });
  }

  addEnemy(enemy) {
    this.enemiesSpawned.push(enemy);
  }

    checkEnemyDistance() {
        for (let i = 0; i < this.enemiesSpawned.length; i++) {
            const enemy = this.enemiesSpawned[i];

            if (!(this.arthur.x <= enemy.x + gamePrefs.GAME_WIDTH / 2 + 32 &&
            this.arthur.x >= enemy.x - gamePrefs.GAME_WIDTH / 2 - 32)) {
                const enemyIndex = this.enemiesSpawned.indexOf(enemy);
                this.enemiesSpawned.splice(enemyIndex, 1);

                this.enemiesWaiting[enemy.spriteTag] = true;
                setTimeout(() => (delete this.enemiesWaiting[enemy.spriteTag]),
                gamePrefs.ENEMY_RESPAWN_TIME);

                enemy.destroy();
            }
        }
    }

  spawnEnemies() {
    // Crea una tabla de búsqueda para crear los enemigos
    const enemyCreators = {
      Zombie: (x, y, name) => new zombiePrefab(this, x, y, name),
      GreenMonster: (x, y, name) => new greenMonsterPrefab(this, x, y, name),
      Crow: (x, y, name) => new crowPrefab(this, x, y, name),
      FlyingKnight: (x, y, name) => new flyingKnightPrefab(this, x, y, name),
      WoodyPig: (x, y, name) => new woodyPigPrefab(this, x, y, name),
      RedArremer: (x, y, name) => true,
      UnicornBoss: (x, y, name) => new unicornPrefab(this, x, y, name),
    };

    // Recorre el array de enemigos spawneables
    for (let i = 0; i < this.enemiesSpawn.objects.length; i++) {
      const spawn = this.enemiesSpawn.objects[i];

      // Verifica si el enemigo ya está en el array de enemigos spawneados
      let isDuplicated = false;
        for (let j = 0; j < this.enemiesSpawned.length; j++) {
            if (this.enemiesSpawned[j].spriteTag == spawn.name) {
                isDuplicated = true;
                break;
            }
        }

        if (spawn.name in this.enemiesWaiting) {
            if(!this.enemiesWaiting[spawn.name]){
                setTimeout(() => (delete this.enemiesWaiting[spawn.name]),
                gamePrefs.ENEMY_RESPAWN_TIME);
                this.enemiesWaiting[spawn.name] = true;
            }
        }
      
      // Si el enemigo no está duplicado y está en el rango de visión del jugador, lo spawnea
      if (
        !isDuplicated && !(spawn.name in this.enemiesWaiting) &&
        this.arthur.x <= spawn.x + gamePrefs.GAME_WIDTH / 2 + 32 &&
        this.arthur.x >= spawn.x - gamePrefs.GAME_WIDTH / 2 - 32 &&
        spawn.properties[0].value != 'RedArremer'
      ) {
        this.enemiesSpawned.push(
          enemyCreators[spawn.properties[0].value](spawn.x, spawn.y, spawn.name)
        );
      }
    }
  }
}
