import { Injectable } from '@angular/core';
import { LinkedListService } from './linkedlist.data-structure';
import { MutationService } from './mutation.service';
import { Chromosome, Gene } from '../data-models/index';
import { RandomService } from '../../shared/services/random.service';
import { DistanceService } from './distance.service';

@Injectable()
export class CrossOverService {

    constructor(
        private mutation: MutationService,
        private distance: DistanceService,
        private rnd: RandomService) {
    }

    public getChild(first: Chromosome, second: Chromosome): Chromosome {
        return this.getChildByLookingAround(first, second);
    }

    public getChildByLookingAround(x: Chromosome, y: Chromosome): Chromosome {
        let count = x.length;
        let xlist = new LinkedListService();
        let ylist = new LinkedListService();
        let prevx = -1, prevy = -1, tmp;

        for (let i = 0; i < count; i++) {
            tmp = x.genes[i].value;
            xlist.addAfter(tmp, prevx);
            prevx = tmp;

            tmp = y.genes[i].value;
            ylist.addAfter(tmp, prevy);
            prevy = tmp;
        }

        var chr = new Chromosome();

        let c = this.rnd.next(count);
        chr.add(new Gene(c));
        var n = count;
        while (n > 1) {
            let bx = xlist.prev(c);
            let by = ylist.prev(c);

            let fx = xlist.next(c);
            let fy = ylist.next(c);

            xlist.remove(c);
            ylist.remove(c);

            n--;

            var dbx = this.distance.distanceByIndex(c, bx);
            var dby = this.distance.distanceByIndex(c, by);
            var dfx = this.distance.distanceByIndex(c, fx);
            var dfy = this.distance.distanceByIndex(c, fy);

            if (dbx > dby) {
                dbx = dby;
                bx = by;
            }
            if (dfx > dfy) {
                dfx = dfy;
                fx = fy;
            }

            c = dbx < dfx ? bx : fx;
            chr.add(new Gene(c));
        }

        return chr;
    }

    public getChildByLookingForward(x: Chromosome, y: Chromosome): Chromosome {
        let count = x.length;
        let xlist = new LinkedListService();
        let ylist = new LinkedListService();
        let prevx = -1, prevy = -1, tmp;

        for (let i = 0; i < count; i++) {
            tmp = x.genes[i].value;
            xlist.addAfter(tmp, prevx);
            prevx = tmp;

            tmp = y.genes[i].value;
            ylist.addAfter(tmp, prevy);
            prevy = tmp;
        }

        var chr = new Chromosome();

        let c = this.rnd.next(count);
        chr.add(new Gene(c));
        var n = count;
        while (n > 1) {
            let fx = xlist.next(c);
            let fy = ylist.next(c);

            xlist.remove(c);
            ylist.remove(c);

            n--;

            var dfx = this.distance.distanceByIndex(c, fx);
            var dfy = this.distance.distanceByIndex(c, fy);

            c = dfx < dfy ? fx : fy;
            chr.add(new Gene(c));
        }

        return chr;
    }

    public getChildByLookingBackward(x: Chromosome, y: Chromosome): Chromosome {
        let count = x.length;
        let xlist = new LinkedListService();
        let ylist = new LinkedListService();
        let prevx = -1, prevy = -1, tmp;

        for (let i = 0; i < count; i++) {
            tmp = x.genes[i].value;
            xlist.addAfter(tmp, prevx);
            prevx = tmp;

            tmp = y.genes[i].value;
            ylist.addAfter(tmp, prevy);
            prevy = tmp;
        }

        var chr = new Chromosome();

        let c = this.rnd.next(count);
        chr.add(new Gene(c));
        var n = count;
        while (n > 1) {
            let fx = xlist.prev(c);
            let fy = ylist.prev(c);

            xlist.remove(c);
            ylist.remove(c);

            n--;

            var dfx = this.distance.distanceByIndex(c, fx);
            var dfy = this.distance.distanceByIndex(c, fy);

            c = dfx < dfy ? fx : fy;
            chr.add(new Gene(c));
        }

        return chr;
    }
}