export interface AndGateProps {
    xOrigin: number;
    yOrigin: number;
    scale: number;
    text: string;
    isOutput: boolean;
}
export type domElementProps = {
    type: string;
    props: WireConnectionProps | AndGateProps;
};
type WireConnectionProps = {
    xOrigin: number;
    yOrigin: number;
    xEnd: number;
    yEnd: number;
};
export declare class CircuitBuilder {
    private binaryTree;
    private componentList;
    constructor(treeInPostFixNotation: string);
}
export {};
