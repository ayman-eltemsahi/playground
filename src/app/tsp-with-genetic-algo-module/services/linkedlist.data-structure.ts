export class LinkedListService {

    private All: Node[];
    private Head: Node;
    private Tail: Node;

    constructor() {
        this.All = []
    }

    public next(num: number) {
        var node = this.All[num];
        if (!node.Next) return this.Head.value;
        return node.Next.value;
    }

    public prev(num: number): number {
        var node = this.All[num];
        if (!node.Prev) return this.Tail.value;
        return node.Prev.value;
    }

    public remove(num: number) {
        var node = this.All[num];

        if (node.Prev) node.Prev.Next = node.Next;
        if (node.Next) node.Next.Prev = node.Prev;

        if (node == this.Head) this.Head = node.Next;

        if (node == this.Tail) this.Tail = node.Prev;
    }

    public addAfter(num: number, after: number = -1) {
        if (after == -1) {
            this.Head = new Node(num);
            this.Tail = this.Head;
            this.All[num] = this.Head;
        }
        else {
            let old = this.All[after];
            let n2 = new Node(num);

            n2.Prev = old;
            old.Next = n2;

            this.Tail = n2;

            this.All[num] = n2;
        }
        return this;
    }
}

class Node {

    constructor(value: number) {
        this.value = value;
    }

    public value: number;
    public Next: Node;
    public Prev: Node;
}