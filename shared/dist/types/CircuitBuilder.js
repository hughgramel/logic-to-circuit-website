"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBuilder = void 0;
const EvaluateExpressions_1 = require("./EvaluateExpressions");
class CircuitBuilder {
    constructor(treeInPostFixNotation, width, height) {
        this.componentList = [];
        this.calculateOutputWireLocationsFromCurrentGate = (xOrigin, yOrigin, scale) => {
            const y = yOrigin;
            const WIDTH_CONST = 50;
            const HEIGHT_TO_WIDTH_RATIO = 1;
            const widthAfterScale = WIDTH_CONST * scale;
            const heightAfterScale = WIDTH_CONST * HEIGHT_TO_WIDTH_RATIO * scale;
            const heightAdjustmentForOutputBasedOnInputCount = (heightAfterScale / (2 + 1));
            const rectangleRightSideMiddleX = xOrigin - widthAfterScale;
            const topLeftX = rectangleRightSideMiddleX - widthAfterScale;
            const topLeftY = y - heightAfterScale / 2;
            const rightWireX = topLeftX - widthAfterScale;
            const rightWireY = topLeftY + heightAdjustmentForOutputBasedOnInputCount * (1);
            const leftWireX = topLeftX - widthAfterScale;
            const leftWireY = topLeftY + heightAdjustmentForOutputBasedOnInputCount * (2);
            return {
                leftWire: {
                    x: leftWireX,
                    y: leftWireY
                },
                rightWire: {
                    x: rightWireX,
                    y: rightWireY
                }
            };
        };
        this.generateAllCircuits = () => {
            const currCompList = [];
            const height = this.rootCoordinate.y * 2;
            const variables = new Set();
            const variableConnectionOrigins = [];
            let xVal = this.rootCoordinate.x;
            let yVal = this.rootCoordinate.y;
            const traverseAllNodesInOrder = (node, xValue, yValue, yValueDiff, isOutput) => {
                if (node != null) {
                    //                 For each node at level i, calculate its vertical position based on its position in the ordered nodes at that level
                    // If a level has n nodes, divide your canvas height h into n+1 segments
                    const WIDTH_CONSTANT = 160;
                    if (EvaluateExpressions_1.operatorSymbols.includes(node.value)) {
                        currCompList.push({
                            type: "AndGate",
                            props: {
                                xOrigin: xValue,
                                yOrigin: yValue,
                                scale: 1,
                                text: "",
                                isOutput: isOutput
                            }
                        });
                        // Now we need to get the connection LEFT WIRE and connection RIGHT WIRE
                        const { leftWire, rightWire } = this.calculateOutputWireLocationsFromCurrentGate(xValue, yValue, 1);
                        let leftEnd;
                        if (node.left && node.right) {
                            const rankAtThisLevelLeft = this.binaryTree.getNodesCountAtLevel(node.left.level);
                            const currentRankInLevelLeft = node.left.rank;
                            const widthOfSegmentOnThisLevelLeft = (height) / (rankAtThisLevelLeft + 1);
                            let leftEndpointX = this.rootCoordinate.x - node.left.level * WIDTH_CONSTANT;
                            let leftEndpointY = (currentRankInLevelLeft + 1) * widthOfSegmentOnThisLevelLeft;
                            let leftStartPointX = leftWire.x;
                            const leftStartPointY = leftWire.y;
                            // Move to bottom
                            const rankAtThisLevelRight = this.binaryTree.getNodesCountAtLevel(node.right.level);
                            const currentRankInLevelRight = node.right.rank;
                            const widthOfSegmentOnThisLevelRight = (height) / (rankAtThisLevelRight + 1);
                            console.log(node.right.value + " should be at Y value: " + (currentRankInLevelRight) * widthOfSegmentOnThisLevelRight);
                            let rightEndpointX = this.rootCoordinate.x - node.right.level * WIDTH_CONSTANT;
                            const rightEndpointY = (currentRankInLevelRight + 1) * widthOfSegmentOnThisLevelRight;
                            let rightStartPointX = rightWire.x;
                            const rightStartPointY = rightWire.y;
                            if (this.bothEndpointsAreBelow(yValue - 15, rightEndpointY, leftEndpointY)) {
                                console.log("below");
                                rightStartPointX = rightWire.x - 15;
                                const extendRightStartPoint = this.createConnection(rightWire.x, rightWire.y, rightWire.x - 15, rightWire.y);
                                currCompList.push({
                                    type: "WireConnection",
                                    props: extendRightStartPoint
                                });
                            }
                            else if (this.bothEndpointsAreAbove(yValue + 15, rightEndpointY, leftEndpointY)) {
                                console.log("above");
                                leftStartPointX = leftWire.x - 15;
                                const extendLeftStartPoint = this.createConnection(leftWire.x, leftWire.y, leftWire.x - 15, leftWire.y);
                                currCompList.push({
                                    type: "WireConnection",
                                    props: extendLeftStartPoint
                                });
                            }
                            // Create and traverse left
                            const newConnectionBetweenCurrentGateAndNextLocationLeft = this.createConnection(leftStartPointX, leftStartPointY, leftEndpointX, leftEndpointY);
                            currCompList.push({
                                type: "WireConnection",
                                props: newConnectionBetweenCurrentGateAndNextLocationLeft
                            });
                            traverseAllNodesInOrder(node.left, leftEndpointX, leftEndpointY, yValueDiff * 2, false);
                            // Create and traverse right
                            const newConnectionBetweenCurrentGateAndNextLocationRight = this.createConnection(rightStartPointX, rightStartPointY, rightEndpointX, rightEndpointY);
                            currCompList.push({
                                type: "WireConnection",
                                props: newConnectionBetweenCurrentGateAndNextLocationRight
                            });
                            traverseAllNodesInOrder(node.right, rightEndpointX, rightEndpointY, yValueDiff * 2, false);
                            // if (!operatorSymbols.includes(node.right.value)) {
                            //     currCompList.push(this.makeConnectionToVariable(mapOfVariableComponents.get("a"), rightStartPointX, rightStartPointY))
                            // } else {
                            // }
                        }
                    }
                    else {
                        currCompList.push({
                            type: "Variable",
                            props: {
                                varLetter: node.value,
                                xPosition: xValue,
                                yPosition: yValue,
                                status: 0
                            }
                        });
                        variables.add(node.value);
                    }
                }
            };
            if (!this.binaryTree.root)
                throw new Error("The root must exist");
            traverseAllNodesInOrder(this.binaryTree.root, xVal, yVal, 100, true);
            console.log(variables);
            let currXForVariables = this.width * 0.05;
            let currYForVariables = (this.height / 2) - (this.height / 2 / 2);
            let adjustmentPerVariableY = (this.height / 2) / (variables.size - 1);
            console.log(currXForVariables);
            console.log(currYForVariables);
            const variablesArrSorted = Array.from(variables).sort();
            const mapOfVariableComponents = new Map();
            variablesArrSorted.forEach((currVar) => {
                if (typeof currVar != "string")
                    throw new Error("Currvar must be string");
                const variableComponent = {
                    varLetter: currVar,
                    xPosition: currXForVariables,
                    yPosition: currYForVariables,
                    status: 0
                };
                currCompList.push({ type: "Variable",
                    props: variableComponent });
                mapOfVariableComponents.set(currVar, variableComponent);
                currYForVariables += adjustmentPerVariableY;
            });
            // Now we have a list of all variables to a. 
            /**
             * Step one: We need to take all
             */
            // currCompList.push(this.makeConnectionToVariable(mapOfVariableComponents.get("a"), 900, 700))
            variableConnectionOrigins.forEach((varConnection) => {
                currCompList.push(this.makeConnectionToVariable(mapOfVariableComponents.get(varConnection.var), varConnection.x, varConnection.y));
            });
            return currCompList;
        };
        this.makeConnectionToVariable = (varComponent, x, y) => {
            const wireConnectionProps = {
                xOrigin: x,
                yOrigin: y,
                xEnd: varComponent.xPosition,
                yEnd: varComponent.yPosition
            };
            return { type: "WireConnection",
                props: wireConnectionProps };
        };
        this.printTree = () => {
            this.binaryTree.print();
        };
        console.log(treeInPostFixNotation);
        this.rootCoordinate = {
            x: width * 0.90,
            y: height / 2
        };
        console.log(width, height);
        this.width = width;
        this.height = height;
        console.log((0, EvaluateExpressions_1.replaceWordsWithCorrectSymbols)(treeInPostFixNotation));
        const createdTree = (0, EvaluateExpressions_1.createBinaryExpressionTreeFromPostFixNotation)((0, EvaluateExpressions_1.replaceWordsWithCorrectSymbols)(treeInPostFixNotation));
        this.binaryTree = createdTree;
        createdTree.print();
        createdTree.setLevelsAndRanks();
        console.log(createdTree);
    }
    bothEndpointsAreBelow(originY, endpointOne, endpointTwo) {
        return endpointOne > originY && endpointTwo > originY;
    }
    bothEndpointsAreAbove(originY, endpointOne, endpointTwo) {
        return endpointOne < originY && endpointTwo < originY;
    }
    createConnection(x1, y1, x2, y2) {
        return {
            xOrigin: x1,
            yOrigin: y1,
            xEnd: x2,
            yEnd: y2
        };
    }
}
exports.CircuitBuilder = CircuitBuilder;
