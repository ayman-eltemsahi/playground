import { Vector } from "../../shared/data-models/";

export class Particle {

    start: Vector;
    pos: Vector;
    vel: Vector;
    acc: Vector;
    color: string;

    constructor(_pos: Vector, _start: Vector, _color: string) {
        this.pos = _pos;
        this.start = _start;
        this.color = _color;
        this.vel = new Vector();
        this.acc = new Vector();
    }
}
