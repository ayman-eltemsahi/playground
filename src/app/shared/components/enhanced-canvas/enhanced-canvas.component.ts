import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Point, Shape } from '../../data-models/';

@Component({
    selector: 'enhanced-canvas',
    templateUrl: 'enhanced-canvas.component.html',
    styleUrls: ['enhanced-canvas.component.html']
})
export class EnhancedCanvasComponent implements OnInit, OnDestroy {

    @Input() id: string;
    @Input("width") originalWidth: number;
    @Input("height") originalHeight: number;
    @ViewChild('canvas') canvas: ElementRef;

    get width() { return this.actualWidth; }
    get height() { return this.actualHeight; }
    private get xFactor() {
        return this.actualWidth / this.originalWidth;
    }
    private get yFactor() {
        return this.actualHeight / this.originalHeight;
    }

    private canvasParent: any;
    private ctx: any;

    private actualWidth: any;
    private actualHeight: any;

    private intervalBetweenWithUpdates: number;
    private preventResizeChange: boolean;
    private haveMemory: boolean;

    private resizeHandler;

    private images = [];

    constructor() {
        this.intervalBetweenWithUpdates = 10;
        this.haveMemory = true;
        this.preventResizeChange = true;
        setTimeout(() => this.preventResizeChange = false, 100);
    }

    set font(font: string) {
        this.ctx.font = font;
    }

    set fillStyle(style: string) {
        this.ctx.fillStyle = style;
    }

    set lineWidth(width: number) {
        this.ctx.lineWidth = width;
    }

    set strokeStyle(style: string) {
        this.ctx.strokeStyle = style;
    }

    ngOnInit() {
        // the element containing the canvas element
        this.canvasParent = document.querySelector('.enhanced-canvas');

        // the canvas element
        this.ctx = this.canvas.nativeElement.getContext("2d");

        this.resizeHandler = () => this.windowResized();
        window.addEventListener('resize', this.resizeHandler);

        // set the width
        this.actualWidth = Number.parseInt(window.getComputedStyle(this.canvasParent).width);

        // set the height
        this.actualHeight = this.originalHeight;
    }

    windowResized() {
        this.resizeCanvas();
        this.enforceResizeChange();
    }

    rectangle(x: number, y: number, size: number) {
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
        this.ctx.fillRect(x * size * this.xFactor, y * size, size, size);
    }

    circle(x: number, y: number, r: number) {
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
        if (!points) {
            throw new TypeError("[points] is null or undefined in canvas.polygon");
        }

        this.ctx.beginPath();

        this.ctx.moveTo(points[0].x * this.xFactor, points[0].y);

        points.forEach(p => {
            this.ctx.lineTo(p.x * this.xFactor, p.y);
        });

        if (closePolygon) {
            this.ctx.lineTo(points[0].x * this.xFactor, points[0].y);
        }

        this.ctx.stroke();
    }

    clear() {
        this.images = [];
        this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }

    private resizeCanvas() {
        const newWidth = Number.parseInt(window.getComputedStyle(this.canvasParent).width);
        if (this.actualWidth === newWidth) return;

        this.canvas.nativeElement.width = newWidth;
        this.actualWidth = newWidth;
    }

    private enforceResizeChange() {
        if (!this.images.length) return;

        if (this.preventResizeChange) {
            setTimeout(() => this.enforceResizeChange(), this.intervalBetweenWithUpdates);
            return;
        }

        this.preventResizeChange = true;

        setTimeout(() => {
            const temp = this.images;
            this.images = [];
            temp.forEach(item => {

                this.fillStyle = item.fillStyle;
                this.strokeStyle = item.strokeStyle;

                switch (item.type) {
                    case Shape.Circle:
                        this.circle(item.x, item.y, item.r);
                        break;
                    case Shape.Rectangle:
                        this.rectangle(item.x, item.y, item.size);
                        break;
                    case Shape.Polygon:
                        this.polygon(item.points, item.closePolygon);
                        break;

                    default:
                        break;
                }
            });

            this.images = temp;

            setTimeout(() => {
                this.preventResizeChange = false;
            }, this.intervalBetweenWithUpdates);
        }, 0);
    }

    ngOnDestroy() {
        window.removeEventListener('resize', this.resizeHandler);
    }
}
