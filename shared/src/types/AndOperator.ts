import { BooleanOperator } from "./Operator";

export class AndOperator implements BooleanOperator {
    operandOne: BooleanOperator | 0 | 1;
    operandTwo: BooleanOperator | 0 | 1;

    constructor(operandOne: BooleanOperator | 0 | 1, operandTwo: BooleanOperator | 0 | 1) {
        this.operandOne = operandOne;
        this.operandTwo = operandTwo;
    }


    eval = (): 0 | 1 => {
        if ((this.operandOne == 0 || this.operandOne == 1) && (this.operandTwo == 0 || this.operandTwo == 1)) {
            // This means they're both 0|1
            return this.operandOne && this.operandTwo
        } else if ((this.operandTwo != 0 && this.operandTwo != 1) && (this.operandOne == 0 || this.operandOne == 1)) {
            // This means that operand two must be a Boolean operator
            return (this.operandTwo.eval() && this.operandOne)
        } else if ((this.operandOne != 0 && this.operandOne != 1) && (this.operandTwo == 0 || this.operandTwo == 1)) {
            // This means operandOne must be a Boolean operator
            return (this.operandOne.eval() && this.operandTwo)
        } else {
            throw new Error("The operator was invalid and could not be evaluated correctly")
        }
    }

    render = (xOrigin: number, yOrigin: number, scale: number, text: string, isOutput: boolean) => [
        console.log("rendering")
    ]
}