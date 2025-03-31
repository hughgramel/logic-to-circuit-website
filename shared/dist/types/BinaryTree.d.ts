export declare class Node<T> {
    value: T;
    left: Node<T> | null;
    right: Node<T> | null;
    constructor(value: T);
}
export declare class BinaryTree<T> {
    root: Node<T> | null;
    constructor();
    static create<T>(head: T, left?: BinaryTree<T> | T | null, right?: BinaryTree<T> | T | null): BinaryTree<T>;
    print(): void;
    private printNode;
}
