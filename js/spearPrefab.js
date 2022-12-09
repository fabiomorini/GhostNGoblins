class spearPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_tag='spear')
    {
        super(_scene,_posX,_posY,_tag);
            _scene.add.existing(this); 
    }
    
   preUpdate()
   {

    /*    if(this.y <=0 || this.y >=config.height)
            this.active=false;
    */
    }
}