var LAYERS = {};
LAYERS.preload = function (context) {
    //Cargamos las tileset que se utilizarán en el nivel
    context.load.setPath('assets/tilesets/');
    context.load.image('background','background.png');
    context.load.image('trees','graveyardTrees.png');
    context.load.image('fences','fences.png');
    context.load.image('grass','grass.png');
    context.load.image('fortress','fortress01.png');
    context.load.image('water','water.png');
    context.load.image('f2Terrain','F2Terrain.png');
    context.load.image('mountainSides','F2MountainSides.png');
    context.load.image('ladders','F2Ladders.png');
    context.load.image('tombs','tombs.png');
    context.load.image('terrain','graveyardTerrain.png');

    this.load.setPath('assets/map/');
    this.load.tilemapTiledJSON('stage1','stage1.json');
    this.load.json('json','stage1.json');
};

LAYERS.create = function () {
    //Pintamos el nivel
    //Cargo el JSON
    this.map = this.add.tilemap('stage1');

    //Cargamos los TILESETS
    this.map.addTilesetImage('background');
    this.map.addTilesetImage('trees');
    this.map.addTilesetImage('fences');
    this.map.addTilesetImage('grass');
    this.map.addTilesetImage('fortress');
    this.map.addTilesetImage('water');
    this.map.addTilesetImage('mountainSides');
    this.map.addTilesetImage('ladders');
    this.map.addTilesetImage('tombs');
    this.map.addTilesetImage('terrain');

    //Pintamos las CAPAS/LAYERS
    this.background = this.map.createLayer('backgroundLayer','background');

    this.trees = this.map.createLayer('2FTreesLayer','trees');
    this.map.createLayer('1FTreesLayer','trees');

    this.fences = this.map.createLayer('2FFences','fences');
    this.map.createLayer('1FFences','fences');

    this.grass = this.map.createLayer('2FGrass','grass');
    this.map.createLayer('1FGrass','grass');

    this.fortress = this.map.createLayer('FortressLayer','fortress');

    this.water = this.map.createLayer('WaterLayer','water');

    this.mountainSides = this.map.createLayer('2FLeftLayer','mountainSides');
    this.map.createLayer('2FRightLayer','mountainSides');

    this.ladders = this.map.createLayer('LaddersLayer','ladders');
    
    this.tombs = this.map.createLayer('1FTombsLayer','tombs');
    this.map.createLayer('2FTombsLayer','tombs');

    this.terrain = this.map.createLayer('TerrainLayer','terrain');
    this.map.createLayer('2FTerrainLayer','terrain');

    //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
    this.map.setCollisionByExclusion(-1,true,true,'TerrainLayer');
    this.map.setCollisionByExclusion(-1,true,true,'2FTerrainLayer');
};

//creación namespace
LAYERS.preload(this);
LAYERS.create(this);