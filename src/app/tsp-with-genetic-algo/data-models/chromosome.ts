import { Gene } from "./gene";

export class Chromosome {

    public genes: Gene[];
    public fitness: number;

    constructor() {
        this.genes = [];
        this.fitness = 0;
    }

    get length(): number {
        return this.genes.length;
    }

    public add(gene: Gene) {
        this.genes.push(gene);
    }

    public clone() {
        const other = new Chromosome();
        for (let i = 0; i < this.genes.length; i++) {
            other.genes.push(this.genes[i].clone());
        }

        other.fitness = this.fitness;
        return other;
    };

    public swap(indexA: number, indexB: number) {
        const tmp = this.genes[indexA];
        this.genes[indexA] = this.genes[indexB];
        this.genes[indexB] = tmp;
    }
}
