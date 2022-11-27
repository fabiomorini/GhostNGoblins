var LAYERS = {};
LAYERS.preload = function (context) {
    //Cargamos las tileset que se utilizarán en el nivel
    context.load.setPath('assets/tilesets/');
    context.load.image('background','background.png');
    // context.load.image('trees','graveyardTrees.png');
    // context.load.image('fences','fences.png');
    // context.load.image('grass','grass.png');
    // context.load.image('fortress','fortress01.png');
    // context.load.image('water','water.png');
    // context.load.image('f2Terrain','F2Terrain.png');
    // context.load.image('firstMountain','mountain01.png');
    // context.load.image('mountainSides','F2MountainSides.png');
    // context.load.image('ladders','F2Ladders.png');
    // context.load.image('tombs','tombs.png');
    // context.load.image('terrain','graveyardTerrain.png');

    context.load.setPath('assets/map/');
    context.load.tilemapTiledJSON('stage1','stage1.json');
    context.load.json('json','stage1.json');
};

LAYERS.create = function (context) {
    //Pintamos el nivel
    //Cargo el JSON
    context.map = context.add.tilemap('stage1');

    //Cargamos los TILESETS
    context.map.addTilesetImage('Background', 'background');
    // context.map.addTilesetImage('1FTreesLayer', 'trees');
    // context.map.addTilesetImage('2FTreesLayer', 'trees');
    // context.map.addTilesetImage('1FFencesLayer', 'fences');
    // context.map.addTilesetImage('2FFencesLayer', 'fences');
    // context.map.addTilesetImage('1FGrassLayer', 'grass');
    // context.map.addTilesetImage('2FGrassLayer', 'grass');
    // context.map.addTilesetImage('FortressLayer', 'fortress');
    // context.map.addTilesetImage('WaterLayer', 'water');
    // context.map.addTilesetImage('MountainLayer', 'firstMountain');
    // context.map.addTilesetImage('2FLeftLayer', 'mountainSides');
    // context.map.addTilesetImage('2FRightLayer', 'mountainSides');
    // context.map.addTilesetImage('LaddersLayer', 'ladders');
    // context.map.addTilesetImage('1FTombsLayer', 'tombs');
    // context.map.addTilesetImage('2FTombsLayer', 'tombs');
    // context.map.addTilesetImage('TerrainLayer', 'terrain');
    // context.map.addTilesetImage('BorderTerrainLayer', 'terrain');
    // context.map.addTilesetImage('2FTerrainLayer', 'f2Terrain');

    //Pintamos las CAPAS/LAYERS
    context.background = context.map.createLayer('BackgroundLayer','Background');
    // context.trees = context.map.createLayer('TreesLayer', ['1FTreesLayer', '2FTreesLayer']);
    // context.fences = context.map.createLayer('FencesLayer', ['1FFencesLayer', '2FFencesLayer']);
    // context.grass = context.map.createLayer('GrassLayer', ['1FGrassLayer', '2FGrassLayer']);
    // context.fortress = context.map.createLayer('FortressLayer', 'FortressLayer');
    // context.water = context.map.createLayer('WaterLayer', 'WaterLayer');
    // context.mountainSides = context.map.createLayer('FirstMountainLayer', 'MountainLayer');
    // context.mountainSides = context.map.createLayer('MountainSidesLayer', ['2FLeftLayer', '2FRightLayer']);
    // context.ladders = context.map.createLayer('LaddersLayer','LaddersLayer');
    // context.tombs = context.map.createLayer('TombsLayer', ['1FTombsLayer', '2FTombsLayer']);
    // context.terrain = context.map.createLayer('TerrainLayer', ['TerrainLayer', 'BorderTerrainLayer']);
    // context.terrain = context.map.createLayer('2FTerrainLayer', '2FTerrainLayer');

    //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
    // context.map.setCollisionByExclusion(-1,true,true,'TerrainLayer');
    // context.map.setCollisionByExclusion(-1,true,true,'2FTerrainLayer');
};