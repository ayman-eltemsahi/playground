
export class Cell {
    x: number;
    y: number;
    f: number;
    g: number;
    h: number;

    neighbors: any;
    cameFrom: any;
    isClosed: boolean;
    isOpen: boolean;
    isTarget: boolean;
    isObstacle: boolean;

    constructor(i, j) {
        this.x = i;
        this.y = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.isClosed = false;
        this.isOpen = false;
        this.isTarget = false;
        this.isObstacle = false;
        this.neighbors = [];
    }
}
