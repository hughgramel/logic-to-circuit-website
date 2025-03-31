
import { BinaryTree, Node } from "./BinaryTree";
import { createBinaryExpressionTreeFromPostFixNotation, operatorMap, operatorSymbols, convertToCorrectLogicalFormat, replaceWordsWithCorrectSymbols } from './EvaluateExpressions';

export interface AndGateProps {
    xOrigin: number;
    yOrigin: number;
    scale: number;
    text: string;
    isOutput: boolean;
}


type domElementProp = 
  | { type: "WireConnection", props: WireConnectionProps }
  | { type: "Variable", props: VariableProps }
  | { type: "AndGate", props: AndGateProps };


type WireConnectionProps = {
    xOrigin: number;
    yOrigin: number;
    xEnd: number;
    yEnd: number;
};


type Coordinate = {
    x: number
    y: number
}


type VariableConnectionOriginProps = {
    var: string
    x: number
    y: number
}

type VariableProps = {
    varLetter: string
    xPosition: number
    yPosition: number
    status: 0 | 1
}

type outputWireCoordinates = {
    leftWire: Coordinate
    rightWire: Coordinate
}


export class CircuitBuilder {
    private binaryTree: BinaryTree<string>;
    private width: number
    private height: number
    private rootCoordinate: Coordinate

    private componentList = []

    constructor(treeInPostFixNotation: string, width: number, height: number) {
        console.log(treeInPostFixNotation)
        
        this.rootCoordinate = {
            x: width * 0.90,
            y: height / 2
        }
        console.log(width, height)
        this.width = width
        this.height = height

        console.log(replaceWordsWithCorrectSymbols(treeInPostFixNotation))
        const createdTree = createBinaryExpressionTreeFromPostFixNotation(replaceWordsWithCorrectSymbols(treeInPostFixNotation))
        this.binaryTree = createdTree;
        createdTree.print()
        createdTree.setLevelsAndRanks()
        console.log(createdTree)
    }


    calculateOutputWireLocationsFromCurrentGate = (xOrigin: number, yOrigin: number, scale: number): outputWireCoordinates => {
        const y = yOrigin
        const WIDTH_CONST = 50
        const HEIGHT_TO_WIDTH_RATIO = 1
        const widthAfterScale = WIDTH_CONST * scale;
        const heightAfterScale = WIDTH_CONST * HEIGHT_TO_WIDTH_RATIO * scale;
    
        const heightAdjustmentForOutputBasedOnInputCount = (heightAfterScale / (2 + 1))
        const rectangleRightSideMiddleX = xOrigin - widthAfterScale

        const topLeftX = rectangleRightSideMiddleX - widthAfterScale
        const topLeftY = y - heightAfterScale / 2
    

        const rightWireX = topLeftX - widthAfterScale
        const rightWireY = topLeftY + heightAdjustmentForOutputBasedOnInputCount * (1)

        const leftWireX = topLeftX - widthAfterScale
        const leftWireY = topLeftY + heightAdjustmentForOutputBasedOnInputCount * (2)
        return {
            leftWire: {
                x: leftWireX,
                y: leftWireY
            },
            rightWire: {
                x: rightWireX,
                y: rightWireY
            }
        }
    }


    generateAllCircuits = (): domElementProp[] => {
        const currCompList: domElementProp[] = []


        const variables = new Set()

        const variableConnectionOrigins: VariableConnectionOriginProps[] = []
        
        let xVal = this.rootCoordinate.x
        let yVal = this.rootCoordinate.y
        
        const traverseAllNodesInOrder = (node: Node<string>, xValue: number, yValue: number, yValueDiff: number, isOutput: boolean) => {
            if (node != null) {
                console.log(node.value)
                console.log(xValue, yValue)
                
                if (operatorSymbols.includes(node.value)) {
                    currCompList.push({
                        type: "AndGate",
                        props: {
                            xOrigin: xValue,
                            yOrigin: yValue,
                            scale: 1,
                            text: "",
                            isOutput: isOutput
                        }
                    })

                    // Now we need to get the connection LEFT WIRE and connection RIGHT WIRE


                    const {leftWire, rightWire} = this.calculateOutputWireLocationsFromCurrentGate(xValue, yValue, 1)

                    if (node.left) {
                        let leftEndpointX = xValue - 200
                        let leftEndpointY = yValue + yValueDiff
                        const leftStartPointX = leftWire.x
                        const leftStartPointY = leftWire.y

                        // if (!operatorSymbols.includes(node.left.value)) {
                        //     variableConnectionOrigins.push({
                        //         var: node.left.value,
                        //         x: leftEndpointX,
                        //         y: leftEndpointY
                        //     })
                        //     variables.add(node.left.value)
                        // }

                        
                       
                            const newConnectionBetweenCurrentGateAndNextLocation = this.createConnection(leftStartPointX, leftStartPointY, leftEndpointX, leftEndpointY)
                            currCompList.push({
                                type: "WireConnection",
                                props: newConnectionBetweenCurrentGateAndNextLocation
                            })
    
                            traverseAllNodesInOrder(node.left, leftEndpointX, leftEndpointY, yValueDiff * 2, false)

                        
                            
                    } 
                    if (node.right) {
                        
                        const rightEndpointX = xValue - 200
                        const rightEndpointY = yValue - yValueDiff
                        const rightStartPointX = rightWire.x
                        const rightStartPointY = rightWire.y
                            const newConnectionBetweenCurrentGateAndNextLocation = this.createConnection(rightStartPointX, rightStartPointY, rightEndpointX, rightEndpointY)
                            currCompList.push({
                                type: "WireConnection",
                                props: newConnectionBetweenCurrentGateAndNextLocation
                            })
                            traverseAllNodesInOrder(node.right, rightEndpointX, rightEndpointY, yValueDiff * 2, false)
                        

                        // if (!operatorSymbols.includes(node.right.value)) {
                        //     currCompList.push(this.makeConnectionToVariable(mapOfVariableComponents.get("a"), rightStartPointX, rightStartPointY))
                        // } else {
                        // }
                    }
                } else {
                    currCompList.push({
                        type: "Variable",
                        props: {
                            varLetter: node.value,
                            xPosition: xValue,
                            yPosition: yValue,
                            status: 0
                        }
                    })
                    variables.add(node.value)
                }
            }
        }
        if (!this.binaryTree.root) throw new Error("The root must exist")
        traverseAllNodesInOrder(this.binaryTree.root, xVal, yVal, 100, true)
        console.log(variables)
        let currXForVariables = this.width * 0.05
        let currYForVariables = (this.height / 2) - (this.height / 2 / 2)
        let adjustmentPerVariableY = (this.height / 2) / (variables.size - 1)
        console.log(currXForVariables)
        console.log(currYForVariables) 

        const variablesArrSorted = Array.from(variables).sort()
        const mapOfVariableComponents = new Map()
        variablesArrSorted.forEach((currVar) => {
            if (typeof currVar != "string") throw new Error("Currvar must be string")
            const variableComponent: VariableProps = {
                varLetter: currVar,
                xPosition: currXForVariables,
                yPosition: currYForVariables,
                status: 0
            }
            currCompList.push({type: "Variable", 
                props: variableComponent})
            mapOfVariableComponents.set(currVar, variableComponent)
            currYForVariables += adjustmentPerVariableY
        })

        // Now we have a list of all variables to a. 

        /**
         * Step one: We need to take all 
         */
        // currCompList.push(this.makeConnectionToVariable(mapOfVariableComponents.get("a"), 900, 700))

        variableConnectionOrigins.forEach((varConnection) => {
            currCompList.push(this.makeConnectionToVariable(mapOfVariableComponents.get(varConnection.var), varConnection.x, varConnection.y))
        })
        return currCompList as domElementProp[]
    }

    private makeConnectionToVariable = (varComponent: VariableProps, x: number, y: number): domElementProp => {
        const wireConnectionProps: WireConnectionProps = {
            xOrigin: x,
            yOrigin: y,
            xEnd: varComponent.xPosition,
            yEnd: varComponent.yPosition
        }
        
        return {type: "WireConnection", 
            props: wireConnectionProps} as domElementProp
    }

    private createConnection(x1: number, y1: number, x2: number, y2: number): WireConnectionProps {
        return {
            xOrigin: x1,
            yOrigin: y1,
            xEnd: x2,
            yEnd: y2
        }
    }


    printTree = () => {
        this.binaryTree.print()
    }
    

    // {React.createElement("WireConnection", {
    //     xOrigin: 1200,
    //     yOrigin: 600,
    //     xEnd: 500, 
    //     yEnd: 400
    // })} 

    // Going to be:

    // {React.createElement{item.type, item.props)} 

    // where item.props will be either a WireConnectionProps
    // or a AndGateProps (That I should change to a gate props)

    // {
    //     xOrigin: number;
    //     yOrigin: number;
    //     scale: number;
    //     text: string;
    //     isOutput: boolean;
    // }
    
}