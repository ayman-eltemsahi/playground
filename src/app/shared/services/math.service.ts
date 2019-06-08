import { Injectable } from '@angular/core';
import { Vector } from '../data-models';

@Injectable()
export class MathService {

    public addVector(v1: Vector, v2: Vector | number) {
        if (typeof v2 === "number")
            return new Vector(v1.x + v2, v1.y + v2);
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    public subVector(v1: Vector, v2: Vector | number) {
        if (typeof v2 === "number")
            return this.addVector(v1, -v2);
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    public multVector(v1: Vector, v2: Vector | number) {
        if (typeof v2 === "number")
            return new Vector(v1.x * v2, v1.y * v2);
        return new Vector(v1.x * v2.x, v1.y * v2.y);
    }

    public divVector(v1: Vector, v2: Vector | number) {
        if (typeof v2 === "number")
            return new Vector(v1.x / v2, v1.y / v2);
        return new Vector(v1.x / v2.x, v1.y / v2.y);
    }
}
