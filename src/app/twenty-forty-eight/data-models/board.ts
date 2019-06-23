export class BoardOf2048 {

    array: any[];
    private setCells: number = 0;;

    constructor() {
        this.array = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    }

    clone(): BoardOf2048 {
        const other = new BoardOf2048();
        this.forEach((val, i, j) => {
            other.set(i, j, val);
        });
        other.setCells = this.setCells;
        return other;
    }


    public at(i: number, j: number): number {
        return this.array[i][j];
    }

    public set(i: number, j: number, value: number): void {
        if (this.array[i][j] === 0 && value !== 0) {
            this.setCells++;
        }

        if (this.array[i][j] !== 0 && value === 0) {
            this.setCells--;
        }

        this.array[i][j] = value;
    }

    public doubleAt(i: number, j: number): void {
        this.array[i][j] *= 2;
    }

    public clear(i: number, j: number): void {
        this.set(i, j, 0);
    }

    public isEmpty(i: number, j: number): boolean {
        return this.array[i][j] === 0;
    }

    public isFull(): boolean {
        return this.setCells === 16;
    }

    public forEach(fn) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                fn(this.array[i][j], i, j);
            }
        }
    }
}
