import { Chromosome } from "./chromosome";

export class Population {

    public chromosomes: Chromosome[];

    constructor() {
        this.chromosomes = [];
    }

    get length() {
        return this.chromosomes.length;
    }

    public push(chromosome: Chromosome) {
        this.chromosomes.push(chromosome);
    }

    public takeTop(count: number) {
        this.chromosomes = this.chromosomes.slice(0, count);
    }

    public sort() {
        this.chromosomes.sort((a, b) => b.fitness - a.fitness);
    }

    public get top(): Chromosome {
        return this.chromosomes[0];
    }
}