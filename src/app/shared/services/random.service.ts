import { Injectable } from '@angular/core';

const HEX = '0123456789ABCDEF';

@Injectable()
export class RandomService {
    private m_w: number;
    private m_z: number;
    private mask: number;

    constructor() {
        this.seed(Date.now());
    }

    public seed(m_w) {
        this.m_w = m_w;
        this.m_z = 987654321;
        this.mask = 0xffffffff;
    }

    public next(min?: number, max?: number): number {

        if (typeof min !== 'number' && typeof max !== 'number') {
            return this.getNextRandom();
        }

        if (typeof min === 'number' && typeof max !== 'number') {
            return this.getNextMax(min);
        }

        return this.getNextMinMax(min, max);
    }

    public nextMinMax(min: number, max: number): number {
        return this.getNextMinMax(min, max);
    }

    public oneIn(n: number): boolean {
        n = n || 0;
        return this.getNextMinMax(0, n) === 0;
    }

    public getRandomColor() {
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += HEX[this.next(0, 16)];
        }
        return color;
    }

    private getNextRandom(): number {
        this.m_z = (36969 * (this.m_z & 65535) + (this.m_z >> 16)) & this.mask;
        this.m_w = (18000 * (this.m_w & 65535) + (this.m_w >> 16)) & this.mask;
        var result = ((this.m_z << 16) + this.m_w) & this.mask;
        result /= 4294967296;
        return result + 0.5;
    }

    private getNextMax(max?: number): number {
        return Math.floor(this.getNextRandom() * max);
    }

    private getNextMinMax(min?: number, max?: number): number {
        return Math.floor(this.getNextRandom() * (max - min)) + min;
    }
}
