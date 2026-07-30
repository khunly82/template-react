import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    /** @type { Phaser.GameObjects.Image } */
    flappy = null

    /** @type { Phaser.GameObjects.Image[] } */
    pipes = []

    speedOfPipes = 200 // px / sec

    pipes_separation = 400

    constructor ()
    {
        super('Game');
    }

    init() 
    {
    }

    create ()
    {
        this.flappy = this.physics.add.image(500, 500, 'flappy');
        this.flappy.setScale(0.1, 0.1);

        this.pipes.push(
            [this.physics.add.image(1200, 200, 'pipe'), this.physics.add.image(1200, 600, 'pipe')],
            [this.physics.add.image(1850, 200, 'pipe'), this.physics.add.image(1850, 600, 'pipe')]
        )

        this.pipes.forEach((p, i) => {
            p[0].setScale(0.3, 0.3);
            p[1].setScale(0.3, 0.3);
            p[0].body.setAllowGravity(false)
            p[1].body.setAllowGravity(false)
            p[0].setRotation(Math.PI)

            
        })

        EventBus.emit('current-scene-ready', this);

        this.input.keyboard.on('keydown', e => {
            if (e.code === 'Space') {
                this.flappy.body.setVelocityY(-400);
            }
        });
    }

    update(time, delta) {
        const deltaX = this.speedOfPipes * delta / 1000
        this.pipes.forEach(p => {
            p[0].x -= deltaX
            p[1].x -= deltaX
            if(p[0].x < -100) {
                p[0].x = 1200
                p[1].x = 1200

                const nPos = (Math.random() * 200) + 100
                p[0].y = nPos
                p[1].y = nPos + this.pipes_separation
            }

            this.physics.overlap(this.flappy, p[0], this.onCollide)
            this.physics.overlap(this.flappy, p[1], this.onCollide)
        })
    }

    onCollide() {
        console.log('ouch')
        this.physics.pause();
    }

}
