export interface AndGateProps {
    xOrigin: number;
    yOrigin: number;
    scale: number;
    text: string;
    isOutput: boolean;
}
type domElementProp = {
    type: "WireConnection";
    props: WireConnectionProps;
} | {
    type: "Variable";
    props: VariableProps;
} | {
    type: "AndGate";
    props: AndGateProps;
};
type WireConnectionProps = {
    xOrigin: number;
    yOrigin: number;
    xEnd: number;
    yEnd: number;
};
type Coordinate = {
    x: number;
    y: number;
};
type VariableProps = {
    varLetter: string;
    xPosition: number;
    yPosition: number;
    status: 0 | 1;
};
type outputWireCoordinates = {
    leftWire: Coordinate;
    rightWire: Coordinate;
};
export declare class CircuitBuilder {
    private binaryTree;
    private width;
    private height;
    private rootCoordinate;
    private componentList;
    constructor(treeInPostFixNotation: string, width: number, height: number);
    calculateOutputWireLocationsFromCurrentGate: (xOrigin: number, yOrigin: number, scale: number) => outputWireCoordinates;
    private bothEndpointsAreBelow;
    private bothEndpointsAreAbove;
    generateAllCircuits: () => domElementProp[];
    private makeConnectionToVariable;
    private createConnection;
    printTree: () => void;
}
export {};
