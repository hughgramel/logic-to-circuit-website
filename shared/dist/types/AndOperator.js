"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndOperator = void 0;
class AndOperator {
    constructor(operandOne, operandTwo) {
        this.operandsAreBothTrueOrFalse = () => {
            return (this.operandOne == 0 || this.operandOne == 1) && (this.operandTwo == 0 || this.operandTwo == 1);
        };
        this.operandOneIsAnOperator = () => {
            return (this.operandOne != 0 && this.operandOne != 1) && (this.operandTwo == 0 || this.operandTwo == 1);
        };
        this.operandTwoIsAnOperator = () => {
            return (this.operandTwo != 0 && this.operandTwo != 1) && (this.operandOne == 0 || this.operandOne == 1);
        };
        this.bothOperandsAreOperators = () => {
            return (this.operandTwo != 0 && this.operandTwo != 1) && (this.operandOne != 0 && this.operandOne != 1);
        };
        /**
         *
         * @returns
         */
        // TODO: Refactor this since I think I could honestly make this like one line?
        this.eval = () => {
            if (this.operandsAreBothTrueOrFalse()) {
                return this.operandOne && this.operandTwo;
            }
            else if (this.operandOneIsAnOperator()) {
                // This means that operand two must be a Boolean operator
                return (this.operandOne.eval() && this.operandTwo);
            }
            else if (this.operandTwoIsAnOperator()) {
                // This means operandOne must be a Boolean operator
                return (this.operandTwo.eval() && this.operandOne);
            }
            else if (this.bothOperandsAreOperators()) {
                return (this.operandOne.eval() && this.operandTwo.eval());
            }
            else {
                throw new Error("The operator was invalid and could not be evaluated correctly");
            }
        };
        this.render = (xOrigin, yOrigin, scale, text, isOutput) => {
            console.log("rendering");
        };
        this.print = () => {
            const operandToString = (operand) => {
                if (typeof operand === "number") {
                    return operand.toString();
                }
                else {
                    return operand.print();
                }
            };
            return `AND(${operandToString(this.operandOne)}, ${operandToString(this.operandTwo)})`;
        };
        this.operandOne = operandOne;
        this.operandTwo = operandTwo;
    }
}
exports.AndOperator = AndOperator;
