import { Injectable } from '@angular/core';
import { Chromosome } from '../data-models/index';
import { RandomService } from '../../shared/services/random.service';
import { DistanceService } from './distance.service';

@Injectable()
export class MutationService {

    private mutationRate: number = 0.05;
    public count: number = 0;

    constructor(private rnd: RandomService, private distance: DistanceService) {
    }

    public setMutationRate(rate: number) {
        if (rate < 0 || rate > 1) {
            throw new TypeError("Muration Rate must be a number between 0 and 1");
        }

        this.mutationRate = rate;
    }

    public mutate(chromosome: Chromosome) {
        if (this.rnd.next() > this.mutationRate) return;

        this.count++;
        this.forceMutate(chromosome);
    }

    public forceMutate(chromosome: Chromosome) {
        let order = chromosome.genes;
        let n = chromosome.length;
        let option = this.rnd.next(3);

        if (option === 0) {
            this.randomPositionMutate(chromosome);
        } else if (option === 1) {
            this.threePiecesMutate(chromosome);
        } else {
            this.neighbourMutate(chromosome);
        }

    }

    public randomPositionMutate(chromosome: Chromosome) {
        let order = chromosome.genes;
        let n = chromosome.length;

        for (let i = 0; i < n / 2; i++) {
            let a = this.rnd.next(n - 1);
            let b = this.rnd.next(n - 1);
            chromosome.swap(a, b);
        }
    }

    public threePiecesMutate(chromosome: Chromosome) {
        let order = chromosome.genes;
        let n = chromosome.length;

        let a = this.rnd.next(n - 5);
        let b = this.rnd.next(a, n - 1);
        let s1 = order.slice(0, a);
        let s2 = order.slice(a, b)
        let s3 = order.slice(b, n);
        chromosome.genes = s2.concat(s1).concat(s3);
    }

    public neighbourMutate(chromosome: Chromosome) {
        let order = chromosome.genes;
        let n = chromosome.length;

        for (let i = 0; i < n; i++) {
            let i1 = (i + 1) % n;
            let i2 = (i + 2) % n;
            let i3 = (i + 3) % n;

            let a = 0;
            a += this.distance.distanceByIndex(order[i].value, order[i1].value);
            a += this.distance.distanceByIndex(order[i2].value, order[i3].value);

            chromosome.swap(i1, i2);

            let b = 0;
            b += this.distance.distanceByIndex(order[i].value, order[i1].value);
            b += this.distance.distanceByIndex(order[i2].value, order[i3].value);

            if (b > a) {
                chromosome.swap(i1, i2);
            }
        }
    }

}