import { BooleanOperator } from "./BooleanOperator";
export declare class NotOperator implements BooleanOperator {
    operandOne: BooleanOperator | 0 | 1;
    constructor(operandOne: BooleanOperator | 0 | 1);
    private operandIsAnOperator;
    private operandIsTrueOrFalse;
    /**
     * This evaluates the operation
     * @returns
     */
    eval: () => 0 | 1;
    render: (xOrigin: number, yOrigin: number, scale: number, text: string, isOutput: boolean) => void;
    print: () => string;
}
