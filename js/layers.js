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

    context.load.setPath('assets/map/');
    context.load.tilemapTiledJSON('stage1','stage1.json');
    context.load.json('json','stage1.json');
};

LAYERS.create = function (context) {
    //Pintamos el nivel
    //Cargo el JSON
    context.map = context.make.tilemap({ key: 'stage1' });

    //Cargamos los TILESETS
    context.map.addTilesetImage('background');
    context.map.addTilesetImage('trees');
    context.map.addTilesetImage('fences');
    context.map.addTilesetImage('grass');
    context.map.addTilesetImage('fortress');
    context.map.addTilesetImage('water');
    context.map.addTilesetImage('mountainSides');
    context.map.addTilesetImage('ladders');
    context.map.addTilesetImage('tombs');
    context.map.addTilesetImage('terrain');

    //Pintamos las CAPAS/LAYERS
    context.background = context.map.createLayer('BackgroundLayer','background');

    context.trees = context.map.createLayer('2FTreesLayer','trees');
    context.map.createLayer('1FTreesLayer','trees');

    context.fences = context.map.createLayer('2FFencesLayer','fences');
    context.map.createLayer('1FFencesLayer','fences');

    context.grass = context.map.createLayer('2FGrassLayer','grass');
    context.map.createLayer('1FGrassLayer','grass');

    context.fortress = context.map.createLayer('FortressLayer','fortress');

    context.water = context.map.createLayer('WaterLayer','water');

    context.mountainSides = context.map.createLayer('2FLeftLayer','mountainSides');
    context.map.createLayer('2FRightLayer','mountainSides');

    context.ladders = context.map.createLayer('LaddersLayer','ladders');
    
    context.tombs = context.map.createLayer('1FTombsLayer','tombs');
    context.map.createLayer('2FTombsLayer','tombs');

    context.terrain = context.map.createLayer('TerrainLayer','terrain');
    context.map.createLayer('2FTerrainLayer','terrain');

    //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
    context.map.setCollisionByExclusion(-1,true,true,'TerrainLayer');
    context.map.setCollisionByExclusion(-1,true,true,'2FTerrainLayer');
};