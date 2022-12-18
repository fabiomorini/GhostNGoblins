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
        this.load.image('tombs','tombs.png');
        this.load.image('terrain','graveyardTerrain.png');

        this.load.setPath('assets/map/');
        this.load.tilemapTiledJSON('stage1','stage1.json');
        this.load.json('json','stage1.json');

        //Cargamos al personaje
        this.load.setPath('assets/sprites/Arthur/');
        this.load.spritesheet('arthur', 'arthur.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('break_armour', 'armour_break.png',
            { frameWidth: 52, frameHeight: 49 });

        this.load.setPath('assets/sprites/Enemies/');
        this.load.spritesheet('zombie', 'zombie.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('greenMonster', 'green_monster.png',
            { frameWidth: 16, frameHeight: 32 });

        this.load.setPath('assets/sprites/Weapons/');
        this.load.image("spear", "Spear.png");
        this.load.image("knife", "Knife.png");
        this.load.spritesheet("fire", "Fire projectile animation.png",
        {frameWidth:32,frameHeight:16});
    }

    create()
    {
        this.startGame();
    }

    startGame()
    {
        this.scene.start('stage1');
    }
}