export class IndexOutOfBoundsError extends Error {
    public name: string;
    constructor(message = "") {
        super('IndexOutOfBoundsError: ' + message);

        this.name = 'IndexOutOfBoundsError';
    }
}
