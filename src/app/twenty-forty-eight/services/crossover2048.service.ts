import { Injectable } from '@angular/core';
import { RandomService } from '../../shared/services/random.service';
import { Chromosome2048 } from '../data-models/gene2048';

@Injectable()
export class CrossOver2048Service {

    constructor(private rnd: RandomService) {
    }

    public getChild(first: Chromosome2048, second: Chromosome2048): Chromosome2048 {
        const child = new Chromosome2048();

        for (let i = 0; i < first.layer1.length; i++) {
            child.layer1[i] = i % 2 == 0 ? first.layer1[i] : second.layer1[i];
        }

        for (let i = 0; i < first.layer2.length; i++) {
            child.layer2[i] = i % 2 == 0 ? first.layer2[i] : second.layer2[i];
        }

        return child;
    }

}
