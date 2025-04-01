import { BinaryTree, Node } from "./BinaryTree"


/**
* Given an string that represents an expression in post-fix notation, returns a binary tree
* that represents
* @param str 
*/
export const createBinaryExpressionTreeFromPostFixNotation = (str: string): BinaryTree<string> => {
    const array = str.split(" ")
    
    if (array.length < 3) {
        throw new Error("Must have at least 2 operands and an operator")
    }

    const stack = []// Use a regular expression to replace the variable
    
    const operators = "*/+-∧∨¬^"
    for (let char of array) {
        if (operators.includes(char)) {
            // Then we want to pop 2 chars, create a binary tree, and push it back.
            const rightOperand = stack.pop()
            let newBinaryTree: BinaryTree<string>;
            if (char != operatorMap["not"]) {
                const leftOperand = stack.pop()
                newBinaryTree = BinaryTree.create(char, leftOperand, rightOperand)
            } else {
                newBinaryTree = BinaryTree.create(char, null, rightOperand)

            }
            stack.push(newBinaryTree)
            // console.log("operator: " + char)
        } else {
            stack.push(char)
            // console.log("operand: " + char)
        }

    }
    const finalTree = stack.pop()
    if (finalTree == undefined || typeof finalTree == "string") throw new Error("Finaltree should be a binary tree")

    return finalTree
}




export const convertParenthesesToPostFix = (str: string) => {
    console.log("Converting to postfix")
    console.log(convertToCorrectLogicalFormat(str))
    const correctFormat = convertToCorrectLogicalFormat(str)
    
    const postfixStack = []
    const stack = []
    // When operand comes, add to postfixStack
    // When operator comes, add to stack column
    // When parentheses comes, add to symbol column\


    for (let char of correctFormat) {
        if (operatorSymbols.includes(char) || "()".includes(char)) {
            // If the character is a known operator
            stack.push(char);
            // console.log(char)
        } else if (/[a-zA-Z0-9]/.test(char)) {
            // If the character is an operand (letter or number)
            postfixStack.push(char);
            // console.log(char)
        } else if (char.trim() === '') {
            // Ignore whitespace
            continue;
        } else {
            // Handle any other characters
            // console.warn(`Unexpected character: ${char}`);
        }
    }

    // console.log("postfixstack")
    // console.log(postfixStack)
    // console.log("stack")
    // console.log(stack)
}

export const ALL_LOWER_AND_UPPER = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

/**
 * This function will take a function, find all variables, 
 * and then output every possible string in postfix notation. This is to be used in a
 * truth table. Varialbes must be LETTERS.
 */
export const getAllPossibleEquations = (equationInPostFixNotation: string) => {
    const equationInPostFixNotationLowercase = equationInPostFixNotation.toLowerCase()
    const uniqueVariableSet = new Set<string>();
    for (let char of equationInPostFixNotationLowercase) {
        if (ALL_LOWER_AND_UPPER.includes(char)) {
            uniqueVariableSet.add(char)
        }
    }

    // Now we need to iterate through the set
    const uniqVarsAsArr = Array.from(uniqueVariableSet)
    const variableCount = uniqVarsAsArr.length
    const possibleNumbers = 2 ** variableCount
    const results = []
    for (let i = 0; i < possibleNumbers; i++) {
        const stringInBinary = i.toString(2).padStart(variableCount, "0")
        let currentEquation = equationInPostFixNotationLowercase
        for (let j = 0; j < variableCount; j++) {
            const currVariable = uniqVarsAsArr[j]
            const currBinaryNumber = stringInBinary[j]
            // Use a regular expression to replace the variable
            currentEquation = currentEquation.replace(new RegExp(currVariable, "g"), currBinaryNumber);
        }
        const result = currentEquation
        results.push(result)
    }
    return results
}

export const operatorSymbols = [
    '∧', '∨', '¬', '→', '↔', 
    '⊤', '⊥', 
    '∩', '∪', '∈', '⊆', 
    '∀', '∃', '|'
  ];

export const operatorMap: { [key: string]: string } = {
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


export const evaluateTree = (root: Node<string>): boolean => {
    if (root == null) throw new Error("Root should not be null")
    if (operatorSymbols.includes(root.value)) {
        // Then evaluate
        
        const evaluationFunction = operatorEvaluationMap[root.value]
        if (!evaluationFunction) throw new Error("Evaluation function for this symbol does not exist");
        if (root.value == '¬' || root.value == '⊤' || root.value == '⊥') {
            if (!root.right) throw new Error("Right must be not null for unary operator")
            return evaluationFunction(evaluateTree(root.right))
        } else {
            if (!root.left || !root.right) throw new Error("Left and right must be not null")
                return evaluationFunction(evaluateTree(root.left), evaluateTree(root.right))
            }
        }
    if (root.value == "0") {
        return false;
    } else if (root.value == "1") {
        return true;
    } else {
        console.log(root.value)
        throw new Error("Tree value is neither an operator, 0, or 1")
    }
}


export const operatorEvaluationMap: { 
    [key: string]: ((a: boolean, b?: boolean) => boolean) | null
} = {
    // Logical operators
    '∧': (a: boolean, b: boolean = false): boolean => a && b,
    '∨': (a: boolean, b: boolean = false): boolean => a || b,
    '¬': (a: boolean): boolean => !a,
    '|': (a: boolean, b: boolean = false): boolean => !a || b,
    '=': (a: boolean, b: boolean = false): boolean => a === b,
  
    
    // Constants
    '⊤': (): boolean => true,
    '⊥': (): boolean => false,
    
    // Set theory operators and quantifiers remain null
    '∩': null,
    '∪': null,
    '∈': null,
    '⊆': null,
    '∀': null,
    '∃': null,
  };

  export const replaceWordsWithCorrectSymbols = (input: string) =>  {
    // Ensure input is a string and convert to lowercase
    const text = String(input).toLowerCase().trim();
    
    // Mapping of logical operators and words to their symbolic representations
    
    
    // Create a regular expression to match whole words
    const regex = new RegExp(Object.keys(operatorMap).join('|'), 'gi');
    
    // Replace words with their symbolic representations
    const convertedText = text.replace(regex, (matched) => {
        return operatorMap[matched.toLowerCase()];
    });
    
    // Remove all whitespace
    
    return convertedText;

}


// TODO: Understand the priority stuff. Finish circuit generator.


export const convertToCorrectLogicalFormat = (input: string) =>  {
    // Ensure input is a string and convert to lowercase
    const text = String(input).toLowerCase().trim();
    
    // Mapping of logical operators and words to their symbolic representations
    
    
    // Create a regular expression to match whole words
    const regex = new RegExp(Object.keys(operatorMap).join('|'), 'gi');
    
    // Replace words with their symbolic representations
    const convertedText = text.replace(regex, (matched) => {
        return operatorMap[matched.toLowerCase()];
    });
    
    // Remove all whitespace
    const condensedText = convertedText.replace(/\s+/g, '');
    
    return condensedText;

}