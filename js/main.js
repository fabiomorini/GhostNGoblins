var gamePrefs=
{
    ARTHUR_JUMP: 400,
    ARTHUR_SPEED: 80,
    ENEMY_SPEED: 100,
    FLYINGKNIGHT_HEIGHT: 300,
    CROW_Y_SPEED: 100,
    GRAVITY: 1500,
    GAME_WIDTH:960,
    GAME_HEIGHT:540,
    LEVEL1_WIDTH:3552,
    LEVEL1_HEIGHT:192,
    SPEAR_SPEED_: 220,
    MAX_BULLET_AMOUNT : 3
}

var config =
{
    type: Phaser.AUTO,
    width: gamePrefs.GAME_WIDTH,
    height: gamePrefs.GAME_HEIGHT,
    scene:[gamePreload, stage1], //array con los niveles/pantallas/escenas (unity)
    render:
    {
        pixelArt:true
    },
    scale:
    {
        mode:Phaser.Scale.FIT,
        width:gamePrefs.GAME_WIDTH/2,
        height:gamePrefs.GAME_HEIGHT/2,
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    physics:
    {
        default:'arcade',
        arcade:
        {
            gravity:{y:gamePrefs.GRAVITY},
            debug:true
        }
    }
}

var juego = new Phaser.Game(config);