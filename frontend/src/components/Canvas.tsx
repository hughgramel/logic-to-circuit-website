import { useLayoutEffect, useRef, useState } from 'react';
import AndGate from './AndGate';
import NotGate from './NotGate';
import { AndOperator } from '@shared/types/AndOperator';
import { OrOperator } from '@shared/types/OrOperator';
import { NotOperator } from '@shared/types/NotOperator';
import { BinaryTree, Node } from '../../../shared/src/types/BinaryTree';
import WireConnection from './WireConnection';
import React from 'react';
import { CircuitBuilder } from '../../../shared/src/types/CircuitBuilder';
import { createBinaryExpressionTreeFromPostFixNotation } from '@shared/types/EvaluateExpressions';
import Variable from './Variable';
import { CMD_STRING } from '../../../shared/src/types/COMMAND';

function Canvas() {

    const divRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (divRef.current) {
        setDimensions({
            width: divRef.current.offsetWidth,
            height: divRef.current.offsetHeight,
        });
        }
    }, []); // Runs only once on mount


    // console.log("For this section our goal is to evaluate this correctly")
    const convertStringToOperations = (str: string) => {
        const result = str
        .replace(/\s+/g, '')      // Remove all spaces
        .replace(/plus|∨|v/gi, '+') // Replace "plus", "∨", or "v" with "+"
        .toLowerCase();           // Convert to lowercase
        console.log(result);
    }
    // convertStringToOperations("(A + B)")
    // convertStringToOperations("a + b")
    // convertStringToOperations("a plus b")
    // convertStringToOperations("a plus (a + b) + abc")


    const and =  new AndOperator(0, 1)
    // console.log(and.print() + " = " + and.eval())
    const not = new NotOperator(new OrOperator(0, 0));


    

    // const correctTree = createBinaryExpressionTreeFromPostFixNotation("a b + c d e + * *")
    // correctTree.print()

    // console.log(inorderTraversal(correctTree))
    


    const lineFunction = (): React.JSX.Element => {
        return <line 
        x1={`${100}`} 
        y1={`${100}`} 
        x2={`${50}`} 
        y2={`${50}`} stroke="black" strokeWidth="3" 
        /> 
    }

    /**
     * TODO: instead of doing AndGates, iterate through the rendering. You should continuously decrease the x value 
     * and decrease / increase the y value based on where you're going. Just do a basic implementation that 
     * makes multiple and blocks and you can fix it later. 
     */

    // (NOTE): Potentially could use an array to connect together when you have multiple ands? Maybe make a function to merge?
    // Make a function to draw lines? 
    
    const circuitBuilder = new CircuitBuilder(CMD_STRING, 1200, 1200)
    // circuitBuilder.printTree()
    const domProps = circuitBuilder.generateAllCircuits()
    return (
        <div ref={divRef} className="w-auto h-full border-2">
            <svg width="100%" height="100%" viewBox={`0 0 1200 1200`} preserveAspectRatio="xMidYMid meet" className="w-auto h-full border-2">0
                {
                    domProps.map((element) => {
                        switch (element.type) {
                            case "WireConnection":
                              return React.createElement(WireConnection, element.props);
                            case "Variable":
                              return React.createElement(Variable, element.props);
                            case "AndGate":
                              return React.createElement(AndGate, element.props);
                            case "NotGate":
                                console.log("creating not gate")
                                return React.createElement(NotGate, element.props);
                            default:
                              return null;
                          }
                      
                    })
                }
            </svg>
        </div>
    );
}

export default Canvas;