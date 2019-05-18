import { Injectable } from '@angular/core';

@Injectable()
export class SharedUtilityService {

    public distancePoint(point1, point2) {
        return this.distance(point1.x, point1.y, point2.x, point2.y);
    }

    public distance(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
}
