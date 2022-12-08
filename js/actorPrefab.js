class actorPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag='actor')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.physics.add.collider
        (
            this,
            _scene.terrain2F,
            this.secondFloorWalk
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

    secondFloorWalk(_actor, _terrain)
    {
        // var collider = Game.scene.add.collider(_actor, _terrain);
        // collider.active = false;
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time,delta);
    }
}