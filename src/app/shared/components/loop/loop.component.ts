import { AfterViewInit } from '@angular/core';


export class LoopComponent implements AfterViewInit {

    cycle: number = 0;
    isRunning: boolean = false;
    animationSpeed: number = 100;

    private automaticStart: boolean;
    private _forceStop: boolean = false;

    constructor(_automaticStart?: boolean) {
        this.automaticStart = _automaticStart;
    }

    ngAfterViewInit() {
        if (this.automaticStart === true) {
            setTimeout(() => this.start(), 2);
        }
    }

    start() {
        this._forceStop = false;
        this.isRunning = true;
        this.cycle = 0;
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

    stop() {
        this.isRunning = false;
    }

    forceStop() {
        this._forceStop = true;
    }

    private _runCycle() {
        if (this._forceStop) {
            this.stop();
            this._forceStop = false;
            return;
        }

        this.cycle++;
        this.run();
        if (this.isRunning) {
            setTimeout(() => this._runCycle(), this.animationSpeed);
        } else {
            this.finish();
        }
    }
}
