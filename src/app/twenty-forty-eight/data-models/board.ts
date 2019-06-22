export class BoardOf2048 {

    constructor() {
        this.array = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    }

    private array: any[];

    public at(n: number, m: number): number {
        return this.array[n][m];
    }

    public set(n: number, m: number, value: number): void {
        this.array[n][m] = value;
    }
}
