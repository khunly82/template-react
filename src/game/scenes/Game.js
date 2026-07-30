import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    /** @type { Phaser.GameObjects.Image } */
    image = null

    constructor ()
    {
        super('Game');
    }

    init() 
    {
    }

    create ()
    {
        this.image = this.physics.add.image(500, 500, 'flappy');
        this.image.setScale(0.1, 0.1);

        EventBus.emit('current-scene-ready', this);

        this.input.keyboard.on('keydown', e => {
            if (e.code === 'Space') {
                this.image.body.setVelocityY(-400);
            }
        });
    }

    update(time, delta) { 
    }

}
