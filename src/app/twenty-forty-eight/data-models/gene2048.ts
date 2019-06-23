
export class Chromosome2048 {

    layer1: number[];
    layer2: number[];

    fitness: number;

    constructor() {
        this.layer1 = [];
        this.layer2 = [];
    }

    clone(): Chromosome2048 {
        const other = new Chromosome2048();
        other.fitness = this.fitness;
        for (let i = 0; i < this.layer1.length; i++) other.layer1[i] = this.layer1[i];
        for (let i = 0; i < this.layer2.length; i++) other.layer2[i] = this.layer2[i];
        return other;
    }

    swapL1(i: number, j: number) {
        const tmp = this.layer1[i];
        this.layer1[i] = this.layer1[j];
        this.layer1[j] = tmp;
    }

    swapL2(i: number, j: number) {
        const tmp = this.layer1[i];
        this.layer2[i] = this.layer2[j];
        this.layer2[j] = tmp;
    }
}
