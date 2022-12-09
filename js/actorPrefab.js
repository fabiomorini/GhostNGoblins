class actorPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag='actor')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.physics.add.collider
        (
            this,
            _scene.terrain2F
        );

        _scene.physics.add.collider
        (
            this,
            _scene.terrainBorder1F
        );

        _scene.physics.add.collider
        (
            this,
            _scene.terrain1F
        );
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time,delta);

        if(this.scene.terrain2F.culledTiles.length > 0)
        {
            var tiles = this.scene.terrain2F.culledTiles

            if(tiles != null)
            {
                for(var i = 0; i < tiles.length; i++)
                {
                    if(tiles[i] != null &&
                        tiles[i].collideLeft &&
                        tiles[i].collideRight &&
                        tiles[i].collideUp &&
                        tiles[i].collideDown)
                    {
                        tiles[i].setCollision(false, false, true, false);
                    }
                }
            }
        }
    }
}