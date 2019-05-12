import { Injectable } from '@angular/core';
import { RandomService } from '../../shared/services/random.service';
import { Chromosome, Population } from '../data-models/index';

@Injectable()
export class SelectionService {

    private normalizedFitness: number[];

    constructor(private rnd: RandomService) {

    }

    normalizeFitness(population: Population) {
        this.normalizedFitness = [];

        let total = population.chromosomes.reduce((prev, cur) => prev + cur.fitness, 0);

        let n = population.chromosomes.length;
        for (let i = 0; i < n; i++) {
            this.normalizedFitness.push(population.chromosomes[i].fitness / total);
        }

        for (let i = 1; i < n; i++) {
            this.normalizedFitness[i] += this.normalizedFitness[i - 1];
        }
    }

    tournament(population: Population): Chromosome {

        let pool = [];

        let n = population.length;
        for (let i = 0; i < n / 10; i++) {
            let index = this.rnd.next(n);
            pool.push(population.chromosomes[index]);
        }
        pool.sort((a, b) => b.fitness - a.fitness);
        return pool[0];
    }

    roulette(population: Population): Chromosome {
        var r = this.rnd.next();

        var lo = 0, hi = population.length - 1, md;
        while (hi - lo > 0) {
            md = Math.floor((lo + hi) / 2);
            if (this.normalizedFitness[md] > r)
                hi = md;
            else lo = md + 1;
        }
        return population.chromosomes[hi];
    }

}