import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    init() {
        this.add.image(0, 0, 'flappy')
    }

    create ()
    {
        EventBus.emit('current-scene-ready', this);
    }

}
