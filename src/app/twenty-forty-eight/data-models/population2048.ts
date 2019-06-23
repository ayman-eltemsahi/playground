import { Chromosome2048 } from './gene2048';

export class Population2048 {
    chromosomes: Chromosome2048[];


    constructor() {
        this.chromosomes = [];
    }

    get length() {
        return this.chromosomes.length;
    }

    get top(): Chromosome2048 {
        return this.chromosomes[0];
    }

    takeTop(n: number) {
        this.chromosomes.length = n;
    }

    push(chromosome: Chromosome2048) {
        this.chromosomes.push(chromosome);
    }

    sort() {
        this.chromosomes.sort((a, b) => b.fitness - a.fitness);
    }
}
