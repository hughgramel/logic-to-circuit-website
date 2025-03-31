"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToCorrectLogicalFormat = exports.operatorEvaluationMap = exports.evaluateTree = exports.operatorMap = exports.operatorSymbols = exports.getAllPossibleEquations = exports.ALL_LOWER_AND_UPPER = exports.convertParenthesesToPostFix = exports.createBinaryExpressionTreeFromPostFixNotation = void 0;
const BinaryTree_1 = require("./BinaryTree");
/**
* Given an string that represents an expression in post-fix notation, returns a binary tree
* that represents
* @param str
*/
const createBinaryExpressionTreeFromPostFixNotation = (str) => {
    const array = str.split(" ");
    if (array.length < 3) {
        throw new Error("Must have at least 2 operands and an operator");
    }
    const stack = []; // Use a regular expression to replace the variable
    const operators = "*/+-∧∨¬^";
    for (let char of array) {
        if (operators.includes(char)) {
            // Then we want to pop 2 chars, create a binary tree, and push it back.
            const rightOperand = stack.pop();
            const leftOperand = stack.pop();
            const newBinaryTree = BinaryTree_1.BinaryTree.create(char, leftOperand, rightOperand);
            stack.push(newBinaryTree);
            console.log("operator: " + char);
        }
        else {
            stack.push(char);
            console.log("operand: " + char);
        }
    }
    const finalTree = stack.pop();
    if (finalTree == undefined || typeof finalTree == "string")
        throw new Error("Finaltree should be a binary tree");
    return finalTree;
};
exports.createBinaryExpressionTreeFromPostFixNotation = createBinaryExpressionTreeFromPostFixNotation;
const convertParenthesesToPostFix = (str) => {
    console.log("Converting to postfix");
    console.log((0, exports.convertToCorrectLogicalFormat)(str));
    const correctFormat = (0, exports.convertToCorrectLogicalFormat)(str);
    const postfixStack = [];
    const stack = [];
    // When operand comes, add to postfixStack
    // When operator comes, add to stack column
    // When parentheses comes, add to symbol column\
    for (let char of correctFormat) {
        if (exports.operatorSymbols.includes(char) || "()".includes(char)) {
            // If the character is a known operator
            stack.push(char);
            console.log(char);
        }
        else if (/[a-zA-Z0-9]/.test(char)) {
            // If the character is an operand (letter or number)
            postfixStack.push(char);
            console.log(char);
        }
        else if (char.trim() === '') {
            // Ignore whitespace
            continue;
        }
        else {
            // Handle any other characters
            console.warn(`Unexpected character: ${char}`);
        }
    }
    console.log("postfixstack");
    console.log(postfixStack);
    console.log("stack");
    console.log(stack);
};
exports.convertParenthesesToPostFix = convertParenthesesToPostFix;
exports.ALL_LOWER_AND_UPPER = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
/**
 * This function will take a function, find all variables,
 * and then output every possible string in postfix notation. This is to be used in a
 * truth table. Varialbes must be LETTERS.
 */
const getAllPossibleEquations = (equationInPostFixNotation) => {
    const equationInPostFixNotationLowercase = equationInPostFixNotation.toLowerCase();
    const uniqueVariableSet = new Set();
    for (let char of equationInPostFixNotationLowercase) {
        if (exports.ALL_LOWER_AND_UPPER.includes(char)) {
            uniqueVariableSet.add(char);
        }
    }
    // Now we need to iterate through the set
    const uniqVarsAsArr = Array.from(uniqueVariableSet);
    const variableCount = uniqVarsAsArr.length;
    const possibleNumbers = 2 ** variableCount;
    const results = [];
    for (let i = 0; i < possibleNumbers; i++) {
        const stringInBinary = i.toString(2).padStart(variableCount, "0");
        let currentEquation = equationInPostFixNotationLowercase;
        for (let j = 0; j < variableCount; j++) {
            const currVariable = uniqVarsAsArr[j];
            const currBinaryNumber = stringInBinary[j];
            // Use a regular expression to replace the variable
            currentEquation = currentEquation.replace(new RegExp(currVariable, "g"), currBinaryNumber);
        }
        const result = currentEquation;
        results.push(result);
    }
    return results;
};
exports.getAllPossibleEquations = getAllPossibleEquations;
exports.operatorSymbols = [
    '∧', '∨', '¬', '→', '↔',
    '⊤', '⊥',
    '∩', '∪', '∈', '⊆',
    '∀', '∃', '|'
];
exports.operatorMap = {
    // Logical operators
    'and': '∧',
    'or': '∨',
    'not': '¬',
    'implies': '→',
    'if': '→',
    'then': '→',
    'equivalent': '↔',
    'iff': '↔',
    // Additional logical symbols
    'true': '⊤',
    'false': '⊥',
    // Set theory operators
    'intersect': '∩',
    'union': '∪',
    'element of': '∈',
    'subset': '⊆',
    // Quantifiers
    'for all': '∀',
    'exists': '∃',
    'such that': '|'
};
// export const evaluateTwoTreesFromPostFixExpression (expressionOne: string, expressionTwo: string): boolean => {
//     const allPossibleEquationsOne = getAllPossibleEquations(expressionOne)
//     const allPossibleEquationsTwo = getAllPossibleEquations(expressionTwo) 
// }
const evaluateTree = (root) => {
    if (root == null)
        throw new Error("Root should not be null");
    if (exports.operatorSymbols.includes(root.value)) {
        // Then evaluate
        const evaluationFunction = exports.operatorEvaluationMap[root.value];
        if (!evaluationFunction)
            throw new Error("Evaluation function for this symbol does not exist");
        if (root.value == '¬' || root.value == '⊤' || root.value == '⊥') {
            if (!root.right)
                throw new Error("Right must be not null for unary operator");
            return evaluationFunction((0, exports.evaluateTree)(root.right));
        }
        else {
            if (!root.left || !root.right)
                throw new Error("Left and right must be not null");
            return evaluationFunction((0, exports.evaluateTree)(root.left), (0, exports.evaluateTree)(root.right));
        }
    }
    if (root.value == "0") {
        return false;
    }
    else if (root.value == "1") {
        return true;
    }
    else {
        console.log(root.value);
        throw new Error("Tree value is neither an operator, 0, or 1");
    }
};
exports.evaluateTree = evaluateTree;
exports.operatorEvaluationMap = {
    // Logical operators
    '∧': (a, b = false) => a && b,
    '∨': (a, b = false) => a || b,
    '¬': (a) => !a,
    '|': (a, b = false) => !a || b,
    '=': (a, b = false) => a === b,
    // Constants
    '⊤': () => true,
    '⊥': () => false,
    // Set theory operators and quantifiers remain null
    '∩': null,
    '∪': null,
    '∈': null,
    '⊆': null,
    '∀': null,
    '∃': null,
};
// TODO: Understand the priority stuff. Finish circuit generator.
const convertToCorrectLogicalFormat = (input) => {
    // Ensure input is a string and convert to lowercase
    const text = String(input).toLowerCase().trim();
    // Mapping of logical operators and words to their symbolic representations
    // Create a regular expression to match whole words
    const regex = new RegExp(Object.keys(exports.operatorMap).join('|'), 'gi');
    // Replace words with their symbolic representations
    const convertedText = text.replace(regex, (matched) => {
        return exports.operatorMap[matched.toLowerCase()];
    });
    // Remove all whitespace
    const condensedText = convertedText.replace(/\s+/g, '');
    return condensedText;
};
exports.convertToCorrectLogicalFormat = convertToCorrectLogicalFormat;
