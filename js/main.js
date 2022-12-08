var gamePrefs=
{
    ARTHUR_JUMP: 330,
    ARTHUR_SPEED: 100,
    ENEMY_SPEED: 100,
    GRAVITY: 1000,
    GAME_WIDTH:960,
    GAME_HEIGHT:540,
    LEVEL1_WIDTH:3584,
    LEVEL1_HEIGHT:192,
    SPEAR_SPEED_: 150
}

var config =
{
    type: Phaser.AUTO,
    width: gamePrefs.GAME_WIDTH,
    height: gamePrefs.GAME_HEIGHT,
    scene:[stage1], //array con los niveles/pantallas/escenas (unity)
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