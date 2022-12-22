class gamePreload extends Phaser.Scene
{
    constructor()
    {
        super({key: "gamePreload"});
    }

    preload()
    {
        //Cargamos las tileset que se utilizarán en el nivel
        this.load.setPath('assets/tilesets/');
        this.load.image('background','background.png');
        this.load.image('trees','graveyardTrees.png');
        this.load.image('fences','fences.png');
        this.load.image('grass','grass.png');
        this.load.image('fortress','fortress01.png');
        this.load.image('water','water.png');
        this.load.image('f2Terrain','F2Terrain.png');
        this.load.image('firstMountain','mountain01.png');
        this.load.image('mountainSides','F2MountainSides.png');
        this.load.image('ladders','F2Ladders.png');
        // this.load.image('tombs','tombs.png');
        this.load.image('tomb01','tomb01.png');
        this.load.image('tomb02','tomb02.png');
        this.load.image('tomb03','tomb03.png');
        this.load.image('terrain','graveyardTerrain.png');

        this.load.setPath('assets/map/');
        this.load.tilemapTiledJSON('stage1','stage1.json');
        this.load.json('json','stage1.json');
        
        //Cargamos los sonidos
        this.load.setPath('assets/audio');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');
        this.load.audio('arthurHit', 'ARTHURHIT.wav');
        this.load.audio('arthurThrow', 'ARTHURTHROW.wav');
        this.load.audio('arthurDeath', 'ARTHURDEATH.wav');
        this.load.audio('armorPickup', 'ARMORPICKUP.wav');
        this.load.audio('zombieSpawn', 'ZOMBIESPAWN.wav');
        this.load.audio('enemyDeath', 'ENEMYDEATH.wav');
        this.load.audio('projectileBlock', 'PROJECTILEBLOCK.wav');
        this.load.audio('flyingKnightAudio', 'FLYINGKNIGHT.wav');
        this.load.audio('gameStart', 'GAMESTART.wav');
        this.load.audio('gameTheme', 'GNGTHEME.mp3');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');

        //Cargamos los sprites del personaje
        this.load.setPath('assets/sprites/Arthur/');
        this.load.spritesheet('arthur', 'arthur.png',
        { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('break_armour', 'armour_break.png',
        { frameWidth: 52, frameHeight: 49 });

        //Cargamos los sprites de los enemigos
        this.load.setPath('assets/sprites/Enemies/');
        this.load.spritesheet('zombie', 'zombie.png',
        { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('greenMonster', 'green_monster.png',
            { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('flyingKnight', 'flying_knight.png',
        {frameWidth:16, frameHeight:30})
        this.load.spritesheet('enemy_death', 'enemy_death.png',
        {frameWidth:44, frameHeight:35})
        this.load.spritesheet("greenMonsterBullet", "greenMonsterBullet.png",
        {frameWidth:32,frameHeight:32});
        this.load.spritesheet("crow", "crow.png",
        {frameWidth:16,frameHeight:16});

        //Cargamos los sprites de las armas
        this.load.setPath('assets/sprites/Weapons/');
        this.load.image("spear", "Spear.png");
        this.load.image("knife", "Knife.png");
        this.load.spritesheet("fire", "Fire projectile animation.png",
        {frameWidth:32,frameHeight:16});

        //Cargamos las fuentes
        this.load.bitmapFont(
            "arcadeFont",
            "../assets/fonts/arcade.png",
            "../assets/fonts/arcade.xml"
          );
    }

    create()
    {
        this.startGame();
    }

    startGame()
    {
        this.scene.start('rankingScene');
    }
}