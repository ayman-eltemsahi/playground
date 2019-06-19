import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Point, Shape } from '../../data-models/';

@Component({
    selector: 'enhanced-canvas',
    templateUrl: 'enhanced-canvas.component.html',
    styleUrls: ['enhanced-canvas.component.css']
})
export class EnhancedCanvasComponent implements OnInit, OnDestroy {

    @Input() id: string;
    @Input("width") originalWidth: number;
    @Input("height") originalHeight: number;
    @ViewChild('canvas') canvas: ElementRef;
    @ViewChild('canvasParent') canvasParent: ElementRef;

    get width() { return this.actualWidth; }
    get height() { return this.actualHeight; }
    get xFactor() {
        return this.actualWidth / this.originalWidth;
    }
    private get yFactor() {
        return this.actualHeight / this.originalHeight;
    }

    private ctx: any;

    private actualWidth: any;
    private actualHeight: any;

    private intervalBetweenWithUpdates: number;
    private preventResizeChange: boolean;
    private haveMemory: boolean;

    private resizeHandler;

    private images = [];
    private eventListeners: { eventName: string, fn: any }[] = [];

    constructor() {
        this.intervalBetweenWithUpdates = 10;
        this.haveMemory = true;
        this.preventResizeChange = true;
        setTimeout(() => this.preventResizeChange = false, 100);
    }

    get offset() {
        const rect = this.canvas.nativeElement.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top
        };
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

    addEventListener(eventName: string, fn: Function) {
        this.eventListeners.push({ eventName, fn })
        this.canvas.nativeElement.addEventListener(eventName, fn);
    }

    onMouseMove(fn: Function) {
        this.addEventListener('mousemove', e => {
            const offset = this.offset;
            const x = (e.x - offset.left) / this.xFactor;
            const y = e.y - offset.top;
            fn({ x, y });
        });
    }

    ngOnInit() {
        this.ctx = this.canvas.nativeElement.getContext("2d");

        this.resizeHandler = () => this.windowResized();
        window.addEventListener('resize', this.resizeHandler);

        // set the width
        this.actualWidth = Number.parseInt(window.getComputedStyle(this.canvasParent.nativeElement).width);

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
        this.ctx.fillRect(x * this.xFactor, y, size, size);
    }

    text(text: string, x: number, y: number) {
        if (this.haveMemory) {
            this.images.push({
                type: Shape.Text,
                text: text,
                x: x,
                y: y,
                fillStyle: this.ctx.fillStyle,
                strokeStyle: this.ctx.strokeStyle,
            });
        }
        this.ctx.fillText(text, x, y);
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
        this.ctx.fill();
        this.ctx.stroke();
    }

    polygon(points: Point[], opts: { closePolygon: boolean } = { closePolygon: false }) {
        if (this.haveMemory) {
            this.images.push({
                type: Shape.Polygon,
                points: points,
                closePolygon: opts.closePolygon,
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

        if (opts.closePolygon) {
            this.ctx.lineTo(points[0].x * this.xFactor, points[0].y);
        }

        this.ctx.stroke();
    }

    clear() {
        this.images = [];
        this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }

    private resizeCanvas() {
        const newWidth = Number.parseInt(window.getComputedStyle(this.canvasParent.nativeElement).width);
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
                        this.polygon(item.points, { closePolygon: item.closePolygon });
                        break;
                    case Shape.Text:
                        this.text(item.text, item.x, item.y);
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
        this.eventListeners.forEach(listener => {
            window.removeEventListener(listener.eventName, listener.fn);
        })
    }
}
