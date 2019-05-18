import { Injectable } from '@angular/core';
import { Chromosome } from '../data-models/index';
import { DistanceService } from './distance.service';

@Injectable()
export class FitnessService {

    constructor(private distance: DistanceService) {
    }

    public calculateFitness(chromosome: Chromosome) {
        let score = 0;

        for (let i = 0, n = chromosome.length, j = n - 1; i < n; i++ , j = (j + 1) % n) {
            score += this.distance.distanceByIndex(chromosome.genes[i].value, chromosome.genes[j].value);
        }

        return 1 - (score / this.distance.MaxDistance);
    }
}