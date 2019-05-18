import { Component, OnInit, ViewChild } from '@angular/core';
import { EnhancedCanvasComponent } from '../../../shared/components/enhanced-canvas/enhanced-canvas.component';
import { Cell } from '../../data-models/';
import { RandomService } from '../../../shared/services/random.service';

@Component({
    selector: 'app-astar-main',
    templateUrl: './astar-main.component.html'
})
export class AstarMainComponent implements OnInit {
    @ViewChild(EnhancedCanvasComponent) canvas: EnhancedCanvasComponent;

    openSet: any[];
    closedSet: any[];
    grid: Cell[][];
    cols: number = 500;
    rows: number = 500;
    startCell: Cell;
    endCell: Cell;
    width = 900;
    height = 800;
    obstacleRate: number = 20;
    state: string;

    constructor(private ran: RandomService) {
    }

    ngOnInit() {

        setTimeout(() => {
            this.initialize();
        }, 2);
    }

    start() {
        this.initialize();
    }

    initialize() {
        this.openSet = [];
        this.closedSet = [];
        this.canvas.clear();

        this.grid = [];
        for (let i = 0; i < this.cols; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j] = new Cell(i, j);
            }
        }

        this.addObstacles();

        this.startCell = this.grid[0][0];
        this.endCell = this.grid[this.cols - 1][this.rows - 1];
        this.endCell.isObstacle = false;
        this.endCell.isTarget = true;

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.addNeighbors(this.grid[i][j], this.grid);
                this.grid[i][j].h = this.euclidean(this.grid[i][j], this.endCell);
            }
        }

        this.draw();
        this.openSet.push(this.startCell);
        this.state = "searching...";
        this.run();
    }

    addObstacles() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.ran.next() * 100 < this.obstacleRate / 4) {
                    this.grid[i][j].isObstacle = true;
                    if (this.ran.oneIn(2) && this.grid[i - 3]) {
                        if (this.grid[i - 1][j]) this.grid[i - 1][j].isObstacle = true;
                        if (this.grid[i - 2][j]) this.grid[i - 2][j].isObstacle = true;
                        if (this.grid[i - 3][j]) this.grid[i - 3][j].isObstacle = true;
                    } else {
                        if (this.grid[i][j - 1]) this.grid[i][j - 1].isObstacle = true;
                        if (this.grid[i][j - 2]) this.grid[i][j - 2].isObstacle = true;
                        if (this.grid[i][j - 3]) this.grid[i][j - 3].isObstacle = true;
                    }
                }
            }
        }
    }

    run() {
        if (this.openSet.length === 0) {
            this.state = "got stuck :(";
            return false;
        }

        let lowestIndex = 0;
        for (let i = 0; i < this.openSet.length; i++) {
            if (this.openSet[i].f < this.openSet[lowestIndex].f)
                lowestIndex = i;
        }

        let current = this.openSet[lowestIndex];
        if (current === this.endCell) {
            this.draw(current);
            this.drawPath(current, "blue");
            console.log('found path...');
            this.state = "found a path :)";
            return true;
        }

        this.closedSet.push(current);
        current.isClosed = true;
        this.openSet = this.openSet.filter(x => x !== current);
        current.isOpen = false;

        let neighbors = current.neighbors;
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            if (!neighbor.isClosed) {
                let tempg = current.g + 1;

                if (neighbor.isOpen) {
                    if (tempg < neighbor.g) {
                        neighbor.g = tempg;
                        neighbor.cameFrom = current;
                        neighbor.f = neighbor.g + neighbor.h;
                    }
                } else {
                    neighbor.g = tempg;
                    neighbor.cameFrom = current;
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.isOpen = true;
                    this.openSet.push(neighbor);
                }
            }
        }

        this.draw(current);
        this.drawPath(current, "blue");
        setTimeout(() => {
            this.run();
        }, 1);
    }


    addNeighbors(cell: Cell, grid) {
        this.add(cell.x - 1, cell.y, cell);
        this.add(cell.x + 1, cell.y, cell);
        this.add(cell.x, cell.y - 1, cell);
        this.add(cell.x, cell.y + 1, cell);

        if (true) { // useDiagonal
            this.add(cell.x - 1, cell.y - 1, cell);
            this.add(cell.x - 1, cell.y + 1, cell);
            this.add(cell.x + 1, cell.y - 1, cell);
            this.add(cell.x + 1, cell.y + 1, cell);
        }
        return cell;
    };

    add(a: number, b: number, cell: Cell) {
        if (this.valid(a, b) && !this.grid[a][b].isObstacle) cell.neighbors.push(this.grid[a][b]);
    }

    draw(current: Cell = void 0) {
        let i1, j1, i2, j2;
        if (current) {
            i1 = Math.max(0, current.x - 10); i2 = Math.min(this.cols, current.x + 10);
            j1 = Math.max(0, current.y - 10); j2 = Math.min(this.rows, current.y + 10);
        } else {
            i1 = 0; i2 = this.cols;
            j1 = 0; j2 = this.rows;
        }
        for (let i = i1; i < i2; i++) {
            for (let j = j1; j < j2; j++) {

                if (this.grid[i][j].isTarget)
                    this.drawRect("red", i, j);
                else if (this.grid[i][j].isObstacle)
                    this.drawRect("black", i, j);
                else if (this.grid[i][j].isClosed)
                    this.drawRect("#ABEBC6", i, j);
                else if (this.grid[i][j].isOpen)
                    this.drawRect("#F9E79F", i, j);
                else
                    this.drawRect("#EBF5FB", i, j);
            }
        }
    }

    drawPath(node: Cell, color: string) {
        while (node) {
            this.drawRect(color, node.x, node.y);
            node = node.cameFrom;
        }
    }

    drawRect(color: string, i: number, j: number) {
        this.canvas.fillStyle = color;
        this.canvas.rectangle(i, j, Math.min(this.width, this.height) / this.cols);
    }

    valid(x: number, y: number) {
        return x >= 0 && y >= 0 && x < this.cols && y < this.rows;
    }

    euclidean(a: Cell, b: Cell) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
    }

    manhattan(a: { x: number; y: number; }, b: { x: number; y: number; }) {
        return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
    }
}
