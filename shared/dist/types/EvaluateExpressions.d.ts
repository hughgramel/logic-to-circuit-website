import { BinaryTree, Node } from "./BinaryTree";
/**
* Given an string that represents an expression in post-fix notation, returns a binary tree
* that represents
* @param str
*/
export declare const createBinaryExpressionTreeFromPostFixNotation: (str: string) => BinaryTree<string>;
export declare const convertParenthesesToPostFix: (str: string) => void;
export declare const ALL_LOWER_AND_UPPER = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
/**
 * This function will take a function, find all variables,
 * and then output every possible string in postfix notation. This is to be used in a
 * truth table. Varialbes must be LETTERS.
 */
export declare const getAllPossibleEquations: (equationInPostFixNotation: string) => string[];
export declare const operatorSymbols: string[];
export declare const operatorMap: {
    [key: string]: string;
};
export declare const evaluateTree: (root: Node<string>) => boolean;
export declare const operatorEvaluationMap: {
    [key: string]: ((a: boolean, b?: boolean) => boolean) | null;
};
export declare const replaceWordsWithCorrectSymbols: (input: string) => string;
export declare const convertToCorrectLogicalFormat: (input: string) => string;
