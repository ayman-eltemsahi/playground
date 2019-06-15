import { Injectable } from '@angular/core';
import { City } from '../data-models/index';
import { IndexOutOfBoundsError } from '../../shared/errors/index';

@Injectable()
export class DistanceService {

    private distanceTable: number[][];
    private numberOfCities: number;
    private _maxDistance: number;

    constructor() {
        this.distanceTable = [];
    }

    public registerCities(cities: City[]) {
        const n = cities.length;

        this.numberOfCities = n;
        this.distanceTable = [];
        const allDistances = [];

        for (let i = 0; i < n; i++) {
            this.distanceTable.push([]);
            for (let j = 0; j < n; j++) {
                const d = this.cityDistance(cities[i], cities[j]);
                this.distanceTable[i].push(d);
                allDistances.push(d);
            }
        }

        allDistances.sort((a, b) => b - a);
        this._maxDistance = allDistances.slice(0, n + 1).reduce((a, b) => a + b, 0) + 1000;
    }


    public get MaxDistance(): number {
        return this._maxDistance;
    }

    public distanceByIndex(indexA: number, indexB: number): number {
        if (indexA < 0 || indexA >= this.numberOfCities) {
            throw new IndexOutOfBoundsError(`Index ${indexA} is out of bounds. Number of Cities = ${this.numberOfCities}`);
        }

        if (indexB < 0 || indexB >= this.numberOfCities) {
            throw new IndexOutOfBoundsError(`Index ${indexB} is out of bounds. Number of Cities = ${this.numberOfCities}`);
        }

        return this.distanceTable[indexA][indexB];
    }

    public cityDistance(first: City, second: City) {
        return this.distance(first.x, first.y, second.x, second.y);
    }

    public distance(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
}
