"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryTree = exports.Node = void 0;
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
exports.Node = Node;
class BinaryTree {
    constructor() {
        this.root = null;
    }
    static create(head, left, right) {
        const tree = new BinaryTree();
        tree.root = new Node(head);
        // Handle left subtree
        if (left) {
            if (left instanceof BinaryTree) {
                tree.root.left = left.root;
            }
            else if (left !== null) {
                tree.root.left = new Node(left);
            }
        }
        // Handle right subtree
        if (right) {
            if (right instanceof BinaryTree) {
                tree.root.right = right.root;
            }
            else if (right !== null) {
                tree.root.right = new Node(right);
            }
        }
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
