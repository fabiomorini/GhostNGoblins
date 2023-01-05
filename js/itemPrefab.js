class itemPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _spriteTag = 'item', _objectType = '') {
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.objectType = _objectType;
        console.log(this.body);
        _scene.physics.add.collider
            (
                this,
                [_scene.terrain2F,
                _scene.terrainBorder1F,
                _scene.terrain1F]
            );

        _scene.physics.add.overlap
            (
                this,
                _scene.arthur,
                this.hit,
                null,
                this
            );
    }

    hit(_this, _arthur) {
        switch (this.objectType) {
            case 'bag':
                _this.setActive(false);
                _this.y += 500;
                _arthur.score += 200;
                break;

            case 'coin':
                _this.setActive(false);
                _this.y += 500;
                _arthur.score += 100;
                break;

            case 'knife':
                _this.setActive(false);
                _this.y += 500;
                _arthur.weapon == 1;
                break;

            case 'fire':
                _this.setActive(false);
                _this.y += 500;
                _arthur.weapon == 2;

                break;

            case 'spear':
                _this.setActive(false);
                _this.y += 500;
                _arthur.weapon == 0;
                break;

            case 'armour':
                _this.setActive(false);
                _this.y += 500;
                if (_arthur.health == 1)
                    _arthur.health += 1;
                break;

            default:
                break;
        }
    }

    itemSprite() {
        switch (this.objectType) {
            case 'bag':
                this.anims.stop().setFrame(13);
                break;

            case 'coin':
                this.anims.play('itemCoin', true);
                break;

            case 'knife':
                this.anims.play('itemKnife', true);
                break;

            case 'fire':
                this.anims.play('itemFire', true);
                break;

            case 'spear':
                this.anims.play('itemSpear', true);
                break;

            case 'armour':
                this.anims.stop().setFrame(12);
                break;

            default:
                break;
        }
    }
    preUpdate(time, delta) {

        this.itemSprite();

        super.preUpdate(time, delta);
    }
}