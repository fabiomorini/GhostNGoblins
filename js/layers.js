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
    context.load.image('firstMountain','mountain01.png');
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
    context.map = context.add.tilemap('stage1');

    //Cargamos los TILESETS
    context.map.addTilesetImage('Background', 'background');
    context.map.addTilesetImage('GraveyardTrees', 'trees');
    context.map.addTilesetImage('Fences', 'fences');
    context.map.addTilesetImage('Grass', 'grass');
    context.map.addTilesetImage('Fortress', 'fortress');
    context.map.addTilesetImage('Water', 'water');
    context.map.addTilesetImage('Mountain01', 'firstMountain');
    context.map.addTilesetImage('Mountain02', 'mountainSides');
    context.map.addTilesetImage('2FLadders', 'ladders');
    context.map.addTilesetImage('Tombs', 'tombs');
    context.map.addTilesetImage('Graveyard Terrain', 'terrain');
    context.map.addTilesetImage('2FTerrain', 'f2Terrain');

    //Pintamos las CAPAS/LAYERS
    context.background = context.map.createLayer('BackgroundLayer','Background');
    context.trees2F = context.map.createLayer('2FTreesLayer', 'GraveyardTrees');
    context.trees1F = context.map.createLayer('1FTreesLayer', 'GraveyardTrees');
    context.fences2F = context.map.createLayer('2FFencesLayer', 'Fences');
    context.fences1F = context.map.createLayer('1FFencesLayer', 'Fences');
    context.grassBorder1F = context.map.createLayer('1FBorderGrassLayer', 'Graveyard Terrain');
    context.grass2F = context.map.createLayer('2FGrassLayer', 'Grass');
    context.grass1F = context.map.createLayer('1FGrassLayer', ['Graveyard Terrain', 'Grass']);
    context.fortress = context.map.createLayer('FortressLayer', 'Fortress');
    context.water = context.map.createLayer('WaterLayer', 'Water');
    context.firstMountain = context.map.createLayer('MountainLayer', 'Mountain01');
    context.mountainLSide = context.map.createLayer('2FLeftLayer', 'Mountain02');
    context.mountainRSide = context.map.createLayer('2FRightLayer', 'Mountain02');
    context.ladders = context.map.createLayer('LaddersLayer','2FLadders');
    context.tombs2F = context.map.createLayer('2FTombsLayer', 'Tombs');
    context.terrain2F = context.map.createLayer('2FTerrainLayer', '2FTerrain');
    context.tombs1F = context.map.createLayer('1FTombsLayer', 'Tombs');
    context.terrainBorder1F = context.map.createLayer('BorderTerrainLayer', 'Graveyard Terrain');
    context.terrain1F = context.map.createLayer('TerrainLayer', 'Graveyard Terrain');

    context.map.setCollisionBetween(1,1,true,true,'BorderTerrainLayer');
    context.map.setCollisionBetween(1,1,true,true,'TerrainLayer');
    // context.map.setCollisionBetween(15,16,true,true,'2FTerrainLayer');
    context.map.setCollisionBetween(5,7,true,true,'1FTombsLayer');
    context.map.setCollisionBetween(5,7,true,true,'2FTombsLayer');
    context.map.setCollisionBetween(12,14,true,true,'LaddersLayer');
    context.map.setCollisionBetween(28,29,true,true,'WaterLayer');
};