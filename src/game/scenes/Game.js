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
        this.image = this.add.image(500, 500, 'flappy')
        this.image.setScale(0.1, 0.1)
    }

    create ()
    {
        EventBus.emit('current-scene-ready', this);
        this.input.keyboard.on('keydown', e => {
            if(e.code === 'Space') {
                if(this.image)
                    this.image.setPosition(this.image.x, this.image.y - 1)
            }
        })
    }

}
