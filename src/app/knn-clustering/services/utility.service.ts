import { Injectable } from '@angular/core';
import { RandomService } from '../../shared/services/random.service';


@Injectable()
export class UtilityService {

    constructor(private rnd: RandomService) {
    }

    cloneArray<T>(array: T[]): T[] {
        return array.slice();
    }

    shuffleArray<T>(array: T[]): T[] {

        let copy = this.cloneArray(array);
        return copy.sort((a, b) => {
            return this.rnd.next() - 0.5;
        });
    }

   
}
