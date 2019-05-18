
export class Gene {

    public value: number;

    constructor(value?: number) {
        this.value = value;
    }

    public clone(): Gene {
        let other = new Gene();
        other.value = this.value;
        return other;
    }
}