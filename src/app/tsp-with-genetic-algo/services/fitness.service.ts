import { Injectable } from '@angular/core';
import { Chromosome, City } from '../data-models/index';
import { DistanceService } from './distance.service';

@Injectable()
export class FitnessService {

    constructor(private distance: DistanceService) {
    }

    public calculateFitness(chromosome: Chromosome, cities: City[]) {
        let score = 0;

        for (let i = 0, n = chromosome.length, j = n - 1; i < n; i++ , j = (j + 1) % n) {
            score += this.distance.distanceByIndex(chromosome.genes[i].value, chromosome.genes[j].value);
        }


        cities.forEach((city, cityIndex) => {
            if (city.desiredPriority <= 0) return;

            var geneIndex = chromosome.genes.findIndex(g => g.value === cityIndex);
            score += (geneIndex - city.desiredPriority) * 100;
        });

        return 1 - (score / this.distance.MaxDistance);
    }
}
