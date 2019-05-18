import { Point } from "../../shared/data-models/";

export class Cluster {

    points: Point[];
    center: Point;
    color: string;

    constructor(clr?: string) {
        this.color = clr || '#000';
        this.points = [];
    }

    addPoint(point: Point) {
        this.points.push(point);
    }

}
