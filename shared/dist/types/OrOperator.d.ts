import { BooleanOperator } from "./BooleanOperator";
export declare class OrOperator implements BooleanOperator {
    operandOne: BooleanOperator | 0 | 1;
    operandTwo: BooleanOperator | 0 | 1;
    constructor(operandOne: BooleanOperator | 0 | 1, operandTwo: BooleanOperator | 0 | 1);
    private operandsAreBothTrueOrFalse;
    private operandOneIsAnOperator;
    private operandTwoIsAnOperator;
    private bothOperandsAreOperators;
    /**
     *
     * @returns
     */
    eval: () => 0 | 1;
    render: (xOrigin: number, yOrigin: number, scale: number, text: string, isOutput: boolean) => void;
    print: () => string;
}
