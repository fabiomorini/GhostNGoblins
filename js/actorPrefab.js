class actorPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag='actor')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.physics.add.collider
        (
            this,
            _scene.terrain2F,
            this.walkOnSecondFloor
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

    walkOnSecondFloor(_actor, _terrain)
    {
        _terrain.setCollision(false, false, true, false);
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time,delta);
    }
}