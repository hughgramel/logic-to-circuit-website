"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBuilder = void 0;
const EvaluateExpressions_1 = require("./EvaluateExpressions");
class CircuitBuilder {
    constructor(treeInPostFixNotation) {
        this.componentList = [];
        console.log(treeInPostFixNotation);
        const createdTree = (0, EvaluateExpressions_1.createBinaryExpressionTreeFromPostFixNotation)(treeInPostFixNotation);
        this.binaryTree = createdTree;
        createdTree.print();
    }
}
exports.CircuitBuilder = CircuitBuilder;
