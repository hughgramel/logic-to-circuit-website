import { BooleanOperator } from "./BooleanOperator";

export class NotOperator implements BooleanOperator {
    operandOne: BooleanOperator | 0 | 1;

    constructor(operandOne: BooleanOperator | 0 | 1) {
        this.operandOne = operandOne;
    }

    private operandIsAnOperator = (): this is { operandOne: BooleanOperator} => {
        return (this.operandOne != 0 && this.operandOne != 1)
    }

    private operandIsTrueOrFalse = (): this is { operandOne: 1 | 0} => {
        return (this.operandOne == 0 || this.operandOne == 1)
    }

    
    /**
     * This evaluates the operation
     * @returns 
     */
    eval = (): 0 | 1 => {
        if (this.operandIsAnOperator()) {
            return ((this.operandOne.eval() == 1) ? 0 : 1)
        } else if (this.operandIsTrueOrFalse()) {
            return ((this.operandOne == 1) ? 0 : 1)
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
    
        return `NOT(${operandToString(this.operandOne)})`;
    }
    
}