import { BooleanOperator } from "./BooleanOperator";

export class AndOperator implements BooleanOperator {
    operandOne: BooleanOperator | 0 | 1;
    operandTwo: BooleanOperator | 0 | 1;

    constructor(operandOne: BooleanOperator | 0 | 1, operandTwo: BooleanOperator | 0 | 1) {
        this.operandOne = operandOne;
        this.operandTwo = operandTwo;
    }

    private operandsAreBothTrueOrFalse = (): this is { operandOne: 0 | 1, operandTwo: 0 | 1 } => {
        return (this.operandOne == 0 || this.operandOne == 1) && (this.operandTwo == 0 || this.operandTwo == 1)
    }

    private operandOneIsAnOperator = (): this is {operandOne: BooleanOperator, operandTwo: 0 | 1} => {
        return (this.operandOne != 0 && this.operandOne != 1) && (this.operandTwo == 0 || this.operandTwo == 1)
    }

    private operandTwoIsAnOperator = (): this is {operandOne: 0 | 1, operandTwo: BooleanOperator} => {
        return (this.operandTwo != 0 && this.operandTwo != 1) && (this.operandOne == 0 || this.operandOne == 1)
    }


    private bothOperandsAreOperators = (): this is {operandOne: BooleanOperator, operandTwo: BooleanOperator} => {
        return (this.operandTwo != 0 && this.operandTwo != 1) && (this.operandOne != 0 && this.operandOne != 1)
    }
    
    /**
     * 
     * @returns 
     */
    // TODO: Refactor this since I think I could honestly make this like one line?
    eval = (): 0 | 1 => {
        if (this.operandsAreBothTrueOrFalse()) {
            return this.operandOne && this.operandTwo
        } else if (this.operandOneIsAnOperator()) {
            // This means that operand two must be a Boolean operator
            return (this.operandOne.eval() && this.operandTwo)
        } else if (this.operandTwoIsAnOperator()) {
            // This means operandOne must be a Boolean operator
            return (this.operandTwo.eval() && this.operandOne)
        } else if (this.bothOperandsAreOperators()) {
            return (this.operandOne.eval() && this.operandTwo.eval())
        } else {
            throw new Error("The operator was invalid and could not be evaluated correctly")
        }
    }

    render = (xOrigin: number, yOrigin: number, scale: number, text: string, isOutput: boolean) => {
        console.log("rendering")
    }

    print = (): string => {
        const operandToString = (operand: BooleanOperator | 0 | 1): string => {
            if (typeof operand === "number") {
                return operand.toString();
            } else {
                return operand.print();
            }
        };
    
        return `AND(${operandToString(this.operandOne)}, ${operandToString(this.operandTwo)})`;
    }
    
}