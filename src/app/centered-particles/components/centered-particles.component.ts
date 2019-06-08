import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Vector } from '../../shared/data-models/';
import { RandomService } from '../../shared/services/random.service';
import { SharedUtilityService } from 'src/app/shared/services/shared-utility.service';
import { CenteredParticlesConfiguration as config } from '../configuration/centered-particles.configuration';
import { EnhancedCanvasComponent } from '../../shared/components/enhanced-canvas/enhanced-canvas.component';
import { LoopComponent } from 'src/app/shared/components/loop/loop.component';
import { Particle } from '../data-models';

@Component({
    selector: 'centered-particles',
    templateUrl: 'centered-particles.component.html',
    styleUrls: ['centered-particles.component.css']
})
export class CenteredParticlesMainComponent extends LoopComponent {
    @ViewChild(EnhancedCanvasComponent) canvas: EnhancedCanvasComponent;

    width: number = 875;
    height: number = 875;

    finished: boolean = false;
    friction: number = config.friction;
    limit: number = 50;
    mouseRange: number = config.mouseRange;

    particles: Particle[] = [];

    mouse: Vector = null;

    constructor(private title: Title,
        private rnd: RandomService,
        private util: SharedUtilityService
    ) {
        super(true);
        this.title.setTitle("Centered Particles");
        this.animationSpeed = 0;
    }

    ngOnInit() {
        this.canvas.onMouseMove(mouseLocation => {
            this.mouse = new Vector(mouseLocation.x, mouseLocation.y);
        });

        this.canvas.addEventListener("mouseleave", () => {
            this.mouse = null;
        });
    }

    initialize() {
        this.particles = [];
        for (let i = 0; i < 100; i++)this.addParticle();
        this.draw();
    }

    run() {
        for (let i = 0; i < this.particles.length; i++) {
            this.applyForce(this.particles[i]);
            this.update(this.particles[i]);
        }

        this.draw();
    }

    applyForce(particle: Particle) {
        particle.acc = Vector.zero
            .add(particle.start.sub(particle.pos))
            .div(400);

        if (this.mouse && this.util.euclideanDistanceP(particle.pos, this.mouse) < this.mouseRange) {
            particle.acc = particle.acc.add(particle.pos.sub(this.mouse))
                .div(400)
                .mult(5);
        }
    }

    update(particle: Particle) {
        particle.vel = particle.vel.mult(1 - this.friction);

        particle.pos = particle.pos.add(particle.vel);
        particle.vel = particle.vel.add(particle.acc);

        // particle.vel = limit(particle.vel, limit);
        // particle.acc = limit(particle.acc, limit);
    }

    private addParticle() {
        const pos = new Vector(this.rnd.next(10, this.width - 10), this.rnd.next(10, this.height - 10));
        const start = new Vector(this.rnd.next(10, this.width - 10), this.rnd.next(10, this.height - 10));
        const particle = new Particle(pos, start, this.rnd.randomColor());
        this.update(particle);

        this.particles.push(particle);
    }

    private draw() {
        this.canvas.clear();
        this.canvas.font = '14px serif';

        this.particles.forEach(particle => {
            this.canvas.strokeStyle = particle.color;
            this.canvas.fillStyle = particle.color;
            this.canvas.circle(particle.pos.x, particle.pos.y, 4);
        });

        if (this.mouse) {
            this.canvas.strokeStyle = 'black';
            this.canvas.fillStyle = 'black';
            this.canvas.rectangle(this.mouse.x, this.mouse.y, 20);
        }
    }
}
