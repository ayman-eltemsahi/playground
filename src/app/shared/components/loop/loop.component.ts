import { AfterViewInit } from '@angular/core';


export class LoopComponent implements AfterViewInit {

    isRunning: boolean = false;
    animationSpeed: number = 100;

    private automaticStart: boolean;

    constructor( _automaticStart?: boolean) {
        this.automaticStart = _automaticStart;
    }

    ngAfterViewInit() {
        if (this.automaticStart === true) {
            setTimeout(() => this.start(), 2);
        }
    }

    start() {
        this.isRunning = true;
        this.initialize();
        this._runCycle();
    }

    initialize() {
        // to be implemented by the extending component
    }

    run() {
        // to be implemented by the extending component
    }

    finish() {
        // to be implemented by the extending component
    }

    private _runCycle() {
        this.run();
        if (this.isRunning) {
            setTimeout(() => this._runCycle(), this.animationSpeed);
        } else {
            this.isRunning = false;
            this.finish();
        }
    }
}
