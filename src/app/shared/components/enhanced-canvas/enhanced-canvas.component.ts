import { Component, OnInit, Input } from '@angular/core';
import { NotImplementedError } from '../../errors/index';
import { Point, CanvasDrawingMode, Shape } from '../../data-models/';

@Component({
    selector: 'enhanced-canvas',
    templateUrl: 'enhanced-canvas.component.html',
    styles: [
        `
        canvas {
            border : 1px solid #ccc;
        }
        `
    ]
})
export class EnhancedCanvasComponent implements OnInit {

    @Input() id: string;
    @Input("width") originalWidth: number;
    @Input("height") originalHeight: number;

    get width() { return this.actualWidth; }
    get height() { return this.actualHeight; }
    private get xFactor() {
        return this.actualWidth / this.originalWidth;
    }
    private get yFactor() {
        return this.actualHeight / this.originalHeight;
    }

    private canvas: any;
    private canvasParent: any;
    private ctx: any;

    private actualWidth: any;
    private actualHeight: any;
    private reDrawAfterResize: boolean;

    private canvasMode: CanvasDrawingMode;
    private intervalBetweenWithUpdates: number;
    private preventResizeChange: boolean;
    private haveMemory: boolean;

    private images = [];

    constructor() {
        this.canvasMode = CanvasDrawingMode.RedrawImmediatlyAfterResize;
        this.intervalBetweenWithUpdates = 10;
        this.haveMemory = false;
        this.preventResizeChange = true;
        setTimeout(() => this.preventResizeChange = false, 100);
    }

    set font(font: string) {
        this.ctx.font = font;
    }

    set fillStyle(color: string) {
        this.ctx.fillStyle = color;
    }

    set strokeStyle(color: string) {
        this.ctx.strokeStyle = color;
    }

    ngOnInit() {
        // the element containing the canvas element
        this.canvasParent = document.querySelector('.enhanced-canvas');

        // the canvas element
        this.canvas = document.querySelector('.enhanced-canvas canvas');
        this.ctx = this.canvas.getContext("2d");
        // $(window).resize(this.windowResized.bind(this));

        // set the width
        this.actualWidth = Number.parseInt(window.getComputedStyle(this.canvasParent).width);

        // set the height
        this.actualHeight = this.originalHeight;
    }

    windowResized() {
        if (this.canvasMode === CanvasDrawingMode.WaitForActualPaintToRedrawAfterResize) {
            this.reDrawAfterResize = true;
        } else {
            this.enforceResizeChange();
        }
    }

    rectangle(x, y, size) {
        if (this.haveMemory) {
            this.images.push({
                type: Shape.Rectangle,
                x: x,
                y: y,
                size: size,
                fillStyle: this.ctx.fillStyle,
                strokeStyle: this.ctx.strokeStyle,
            });
        }
        this.preDraw();
        this.ctx.fillRect(x * size * this.xFactor, y * size, size, size);
    }

    circle(x, y, r) {
        if (this.haveMemory) {
            this.images.push({
                type: Shape.Circle,
                x: x,
                y: y,
                r: r,
                fillStyle: this.ctx.fillStyle,
                strokeStyle: this.ctx.strokeStyle,
            });
        }
        this.ctx.beginPath();
        this.ctx.arc(x * this.xFactor, y, r, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    polygon(points: Point[], closePolygon: boolean = false) {
        if (this.haveMemory) {
            this.images.push({
                type: Shape.Polygon,
                points: points,
                closePolygon: closePolygon,
                fillStyle: this.ctx.fillStyle,
                strokeStyle: this.ctx.strokeStyle,
            });
        }
        this.preDraw();
        if (!points) {
            throw new TypeError("[points] is null or undefined in canvas.polygon");
        }

        let n = points.length;
        this.ctx.beginPath();

        this.ctx.moveTo(points[0].x * this.xFactor, points[0].y);

        points.map(p => {
            this.ctx.lineTo(p.x * this.xFactor, p.y);
        });

        if (closePolygon) {
            this.ctx.lineTo(points[0].x * this.xFactor, points[0].y);
        }

        this.ctx.stroke();
    }

    clear() {
        this.images = [];
        this.preDraw();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private preDraw() {
        this.enforceResizeChange();
    }

    private enforceResizeChange() {
        if (this.preventResizeChange || !this.images.length) return;
        var newWidth = this.canvasParent.width();
        if (this.actualWidth == newWidth) return;
        this.preventResizeChange = true;

        this.reDrawAfterResize = false;
        this.canvas.width = newWidth;
        this.actualWidth = newWidth;

        setTimeout(() => {
            let reserve = this.images;
            this.images = [];
            reserve.map(x => {

                this.fillStyle = x.fillStyle;
                this.strokeStyle = x.strokeStyle;

                switch (x.type) {
                    case Shape.Circle:
                        this.circle(x.x, x.y, x.r);
                        break;
                    case Shape.Rectangle:
                        this.rectangle(x.x, x.y, x.size);
                        break;
                    case Shape.Polygon:
                        this.polygon(x.points, x.closePolygon);
                        break;

                    default:
                        break;
                }
            });

            this.images = reserve;

            setTimeout(() => {
                this.preventResizeChange = false;
            }, this.intervalBetweenWithUpdates);
        }, 0);
    }
}
