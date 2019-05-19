import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Vector } from '../../shared/data-models/';
import { RandomService } from '../../shared/services/random.service';
import { SharedUtilityService } from 'src/app/shared/services/shared-utility.service';
import { CenteredParticlesConfiguration as config } from '../configuration/centered-particles.configuration';
import { EnhancedCanvasComponent } from '../../shared/components/enhanced-canvas/enhanced-canvas.component';
import { LoopComponent } from 'src/app/shared/components/loop/loop.component';
import { Particle } from '../data-models';
import { MathService } from 'src/app/shared/services/math.service';

let add, sub, mult, div;

@Component({
    selector: 'centered-particles',
    templateUrl: 'centered-particles.component.html'
})
export class CenteredParticlesMainComponent extends LoopComponent {
    @ViewChild(EnhancedCanvasComponent) canvas: EnhancedCanvasComponent;

    width: number = 875;
    height: number = 875;

    finished: boolean = false;
    friction: number = 0.98;
    limit: number = 50;
    mouseRange: number = 100;

    particles: Particle[] = [];

    mouse: Vector = new Vector();

    constructor(private title: Title,
        private rnd: RandomService,
        private util: SharedUtilityService,
        private math: MathService
    ) {
        super(true);
        this.title.setTitle("Centered Particles");
        this.animationSpeed = 0;

        add = this.math.addVector;
        sub = this.math.subVector;
        mult = this.math.multVector;
        div = this.math.divVector;
    }

    ngOnInit() {
        this.canvas.addEventListener("mousemove", e => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
    }

    initialize() {
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

    finish() {

    }

    applyForce(particle: Particle) {
        particle.acc = mult(particle.acc, 0);
        particle.acc = div(add(particle.acc, sub(particle.start, particle.pos)), 400);

        if (this.util.euclideanDistanceP(particle.pos, this.mouse) < this.mouseRange) {
            particle.acc = add(particle.acc, sub(particle.pos, this.mouse));
            particle.acc = div(particle.acc, 400);
            particle.acc = mult(particle.acc, 5);
        }
    }

    update(particle: Particle) {
        particle.vel = mult(particle.vel, this.friction);

        particle.pos = add(particle.pos, particle.vel);
        particle.vel = add(particle.vel, particle.acc);

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
            this.canvas.circle(particle.pos.x, particle.pos.y, 4);
        });
    }
}
