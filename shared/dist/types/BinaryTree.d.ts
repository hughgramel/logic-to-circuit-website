export declare class Node<T> {
    value: T;
    left: Node<T> | null;
    right: Node<T> | null;
    level: number;
    rank: number;
    constructor(value: T);
}
/**
 * Looking at your logic circuit diagram, I understand you're trying to create a layout algorithm for a binary tree representation of logic gates. Your current approach with constant horizontal shifts and scaled vertical shifts is creating layout issues.
Here's a more effective algorithm for placing nodes in a binary tree visualization:

Use a level-based horizontal positioning:

Assign each level of the tree a fixed x-coordinate
For a tree of depth d, if your canvas width is w, you can space levels at intervals of w/(d+1)


Allocate vertical space proportionally:

For each node at level i, calculate its vertical position based on its position in the ordered nodes at that level
If a level has n nodes, divide your canvas height h into n+1 segments


Implement a "post-order traversal" calculation:

First calculate positions of all children nodes
Then position parent nodes at the vertical midpoint between their children
This ensures parents are centered between their children


Apply horizontal offsets for sibling separation:

Ensure sibling subtrees don't overlap by calculating the minimum required separation



This approach maintains proper hierarchical relationships while preventing node overlap. For logic circuits specifically, you might also want to add additional spacing for connection lines and gates.
Would you like me to elaborate on any specific part of this algorithm or provide some pseudocode for implementation?
 */
export declare class BinaryTree<T> {
    root: Node<T> | null;
    depth: number;
    nodeCount: number;
    private rankMap;
    constructor();
    static create<T>(head: T, left?: BinaryTree<T> | T | null, right?: BinaryTree<T> | T | null): BinaryTree<T>;
    print(): void;
    private setLevelsAndRanksOfTreeAux;
    setLevelsAndRanks(): void;
    getNodesCountAtLevel(level: number): number;
    getMaxLevel(): number;
    private printNode;
}
