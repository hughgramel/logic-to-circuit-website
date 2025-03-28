"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotOperator = void 0;
class NotOperator {
    constructor(operandOne) {
        this.operandIsAnOperator = () => {
            return (this.operandOne != 0 && this.operandOne != 1);
        };
        this.operandIsTrueOrFalse = () => {
            return (this.operandOne == 0 || this.operandOne == 1);
        };
        /**
         * This evaluates the operation
         * @returns
         */
        this.eval = () => {
            if (this.operandIsAnOperator()) {
                return ((this.operandOne.eval() == 1) ? 0 : 1);
            }
            else if (this.operandIsTrueOrFalse()) {
                return ((this.operandOne == 1) ? 0 : 1);
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
            return `NOT(${operandToString(this.operandOne)})`;
        };
        this.operandOne = operandOne;
    }
}
exports.NotOperator = NotOperator;
