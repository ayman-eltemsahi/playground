import { Injectable } from '@angular/core';
import { RandomService } from '../../shared/services/random.service';
import { Population2048 } from '../data-models/population2048';
import { Chromosome2048 } from '../data-models/gene2048';

@Injectable()
export class Selection2048Service {

    private normalizedFitness: number[];

    constructor(private rnd: RandomService) {

    }

    normalizeFitness(population: Population2048) {
        this.normalizedFitness = [];
        const total = population.chromosomes.reduce((prev, cur) => prev + cur.fitness, 0);
        const n = population.chromosomes.length;

        for (let i = 0; i < n; i++) {
            this.normalizedFitness.push(population.chromosomes[i].fitness / total);
        }

        for (let i = 1; i < n; i++) {
            this.normalizedFitness[i] += this.normalizedFitness[i - 1];
        }
    }

    tournament(population: Population2048): Chromosome2048 {
        const pool = [], n = population.length;
        for (let i = 0; i < n / 10; i++) {
            const index = this.rnd.next(n);
            pool.push(population.chromosomes[index]);
        }
        pool.sort((a, b) => b.fitness - a.fitness);
        return pool[0];
    }

    roulette(population: Population2048): Chromosome2048 {
        const r = this.rnd.next();

        let lo = 0, hi = population.length - 1, md;
        while (hi - lo > 0) {
            md = Math.floor((lo + hi) / 2);
            if (this.normalizedFitness[md] > r)
                hi = md;
            else lo = md + 1;
        }
        return population.chromosomes[hi];
    }

}
