/**
 * This class represends an operator that takes two operands, which can be
 * either other BooleanOperator objects e.g Plus(Plus(1, 0), 1) or just 1 | 0. 
 * 
 */
export interface BooleanOperator {
    
    operandOne: BooleanOperator | 1 | 0
    operandTwo: BooleanOperator | 1 | 0

    /**
     * This function evaluates both operators and then renders them
     * @returns The result of the boolean evaluation
     */
    eval: () => 1 | 0

    /**
     * This function renders the Boolean operation on the screen to represent as a circuit
     * @param xOrigin The x origin, which the rightmost wire / output wire will be placed at
     * @param yOrigin The y originn, where the rightmost wire / output wire will be placed at
     * @param scale The scale of the object that impacts what it looks like
     * @param text The text representing the operation it's performing
     * @param isOutput Boolean value representing whether the ouput of this should be printed on the output wire
     * @returns 
     */
    render: (xOrigin: number, yOrigin: number, scale: number, text: string, isOutput: boolean) => void
}