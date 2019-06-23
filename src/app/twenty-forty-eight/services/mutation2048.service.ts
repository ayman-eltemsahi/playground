import { Injectable } from '@angular/core';
import { RandomService } from '../../shared/services/random.service';
import { Chromosome2048 } from '../data-models/gene2048';

@Injectable()
export class Mutation2048Service {

    private mutationRate: number = 0.05;
    public count: number = 0;

    constructor(private rnd: RandomService) {
    }

    public setMutationRate(rate: number) {
        if (rate < 0 || rate > 1) {
            throw new TypeError("Mutation Rate must be a number between 0 and 1");
        }

        this.mutationRate = rate;
    }

    public mutate(chromosome: Chromosome2048) {
        if (this.rnd.next() > this.mutationRate) return;

        this.count++;
        this.forceMutate(chromosome);
    }

    public forceMutate(chromosome: Chromosome2048) {
        const option = this.rnd.next(2);

        if (option === 0) {
            this.randomPositionMutate(chromosome);
        } else if (option === 1) {
            this.threePiecesMutate(chromosome);
        }
    }

    public randomPositionMutate(chromosome: Chromosome2048) {
        const layer1 = chromosome.layer1;
        const n = layer1.length;

        for (let i = 0; i < n / 2; i++) {
            const a = this.rnd.next(n - 1);
            const b = this.rnd.next(n - 1);
            chromosome.swapL1(a, b);
        }
    }

    public threePiecesMutate(chromosome: Chromosome2048) {
        const layer1 = chromosome.layer1;
        const n = layer1.length;

        const a = this.rnd.next(n - 5);
        const b = this.rnd.next(a, n - 1);
        const s1 = layer1.slice(0, a);
        const s2 = layer1.slice(a, b)
        const s3 = layer1.slice(b, n);
        chromosome.layer1 = s2.concat(s1).concat(s3);
    }

}
