"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryTree = exports.Node = void 0;
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.level = 0;
        this.rank = 0;
    }
}
exports.Node = Node;
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
class BinaryTree {
    constructor() {
        this.rankMap = new Map(); // Store rank counts for each level
        this.setLevelsAndRanksOfTreeAux = (node, level) => {
            if (!node)
                return;
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
        };
        this.root = null;
        this.depth = -1;
        this.nodeCount = 0;
    }
    static create(head, left, right) {
        const tree = new BinaryTree();
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
            }
            else if (left !== null) {
                tree.root.left = new Node(left);
                leftDepth = 1;
                tree.nodeCount += 1;
            }
        }
        // Handle right subtree
        if (right) {
            if (right instanceof BinaryTree) {
                console.log(right.root);
                tree.root.right = right.root;
                rightDepth = right.depth + 1;
                tree.nodeCount += right.nodeCount;
            }
            else if (right !== null) {
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
    print() {
        if (!this.root) {
            console.log('Tree is empty');
            return;
        }
        this.printNode(this.root, '', true);
    }
    // Public method to initialize the process
    setLevelsAndRanks() {
        // Clear the rank map before starting
        if (!this.root)
            throw new Error("Tree is empty, cannot set levels or ranks");
        this.rankMap.clear();
        this.setLevelsAndRanksOfTreeAux(this.root, 0);
    }
    // Helper method to get the max rank (number of nodes) at a specific level
    getNodesCountAtLevel(level) {
        return this.rankMap.get(level) || 0;
    }
    // Helper method to get the maximum level in the tree
    getMaxLevel() {
        let maxLevel = 0;
        for (const level of this.rankMap.keys()) {
            maxLevel = Math.max(maxLevel, level);
        }
        return maxLevel;
    }
    printNode(node, prefix, isLeft) {
        if (!node)
            return;
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
exports.BinaryTree = BinaryTree;
