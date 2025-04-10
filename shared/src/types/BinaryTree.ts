export class Node<T> {
    value: T;
    left: Node<T> | null;
    right: Node<T> | null;
    level: number
    rank: number


    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.level = 0
        this.rank = 0
    }
}


// If it's a not operator, put it on the right

export class BinaryTree<T> {
    root: Node<T> | null
    depth: number
    nodeCount: number

    private rankMap: Map<number, number> = new Map(); // Store rank counts for each level


    constructor() {
        this.root = null;
        this.depth = -1
        this.nodeCount = 0
    }

    static create<T>(
        head: T, 
        left?: BinaryTree<T> | T | null, 
        right?: BinaryTree<T> | T | null
    ): BinaryTree<T> {
        const tree = new BinaryTree<T>();
        tree.root = new Node(head);
        tree.nodeCount = 1; // Just the head node initially
        
        let leftDepth = 0;
        let rightDepth = 0;
        
        // Handle left subtree
        if (left) {
            if (left instanceof BinaryTree) {
                tree.root.left = left.root;
                leftDepth = left.depth + 1;
                tree.nodeCount += left.nodeCount;
            } else if (left !== null) {
                tree.root.left = new Node(left);
                leftDepth = 1;
                tree.nodeCount += 1;
            }
        }
    
        // Handle right subtree
        if (right) {
            if (right instanceof BinaryTree) {
                console.log(right.root)
                tree.root.right = right.root;
                rightDepth = right.depth + 1;
                tree.nodeCount += right.nodeCount;
            } else if (right !== null) {
                tree.root.right = new Node(right);
                rightDepth = 1;
                tree.nodeCount += 1;
            }
        }
        
        // Set the depth as the maximum depth from either subtree
        tree.depth = Math.max(leftDepth, rightDepth);
        
        return tree;
    }

    // Print method to visualize the tree
    print(): void {
        if (!this.root) {
            console.log('Tree is empty');
            return;
        }

        this.printNode(this.root, '', true);
    }



        
    private setLevelsAndRanksOfTreeAux = (node: Node<T>, level: number) => {
        if (!node) return;

        // Process right subtree first
        if (node.right) {
            this.setLevelsAndRanksOfTreeAux(node.right, level + 1);
        }

        // Set level of current node
        node.level = level;
        
        // Get current rank at this level or initialize to 0
        const currentRank = this.rankMap.get(level) || 0;
        
        // Set rank of current node
        node.rank = currentRank;
        
        // Increment rank for this level
        this.rankMap.set(level, currentRank + 1);

        // Process left subtree
        if (node.left) {
            this.setLevelsAndRanksOfTreeAux(node.left, level + 1);
        }
    }
    
    // Public method to initialize the process
    public setLevelsAndRanks() {
        // Clear the rank map before starting
        if (!this.root) throw new Error("Tree is empty, cannot set levels or ranks")
        this.rankMap.clear();
        this.setLevelsAndRanksOfTreeAux(this.root, 0);
    }
    
    // Helper method to get the max rank (number of nodes) at a specific level
    public getNodesCountAtLevel(level: number): number {
        return this.rankMap.get(level) || 0;
    }
    
    // Helper method to get the maximum level in the tree
    public getMaxLevel(): number {
        let maxLevel = 0;
        for (const level of this.rankMap.keys()) {
            maxLevel = Math.max(maxLevel, level);
        }
        return maxLevel;
    }
    


    

    private printNode(node: Node<T> | null, prefix: string, isLeft: boolean): void {
        if (!node) return;

        // Print right subtree first (top of the visualization)
        if (node.right) {
            this.printNode(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }

        // Print current node
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);

        // Print left subtree (bottom of the visualization)
        if (node.left) {
            this.printNode(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}