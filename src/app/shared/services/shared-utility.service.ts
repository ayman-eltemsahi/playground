import { Injectable } from '@angular/core';
import { Point } from '../data-models';

@Injectable()
export class SharedUtilityService {

    public euclideanDistanceP(point1: Point, point2: Point) {
        return this.euclideanDistance(point1.x, point1.y, point2.x, point2.y);
    }

    public manhattanDistanceP(point1: Point, point2: Point) {
        return this.manhattanDistance(point1.x, point1.y, point2.x, point2.y);
    }

    public euclideanDistance(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }

    public manhattanDistance(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
}
