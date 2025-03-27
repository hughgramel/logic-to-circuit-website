import { useLayoutEffect, useRef, useState } from 'react';
import AndGate from './AndGate';
import { AndOperator } from '@shared/types/AndOperator';
import { OrOperator } from '@shared/types/OrOperator';
import { NotOperator } from '@shared/types/NotOperator';

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


    console.log("For this section our goal is to evaluate this correctly")
    const convertStringToOperations = (str: string) => {
        const result = str
        .replace(/\s+/g, '')      // Remove all spaces
        .replace(/plus|∨|v/gi, '+') // Replace "plus", "∨", or "v" with "+"
        .toLowerCase();           // Convert to lowercase
        console.log(result);
    }
    convertStringToOperations("(A + B)")
    convertStringToOperations("a + b")
    convertStringToOperations("a plus b")
    convertStringToOperations("a plus (a + b) + abc")


    const and =  new AndOperator(new OrOperator(0, 1), new AndOperator(1, new OrOperator(0, new AndOperator(1, 1))))
    console.log(and.print() + " = " + and.eval())
    const not = new NotOperator(new OrOperator(0, 0));
    console.log(not.print() + " = " + not.eval())


    /**
     * TODO: instead of doing AndGates, iterate through the rendering. You should continuously decrease the x value 
     * and decrease / increase the y value based on where you're going. Just do a basic implementation that 
     * makes multiple and blocks and you can fix it later. 
     */

    // (NOTE): Potentially could use an array to connect together when you have multiple ands? Maybe make a function to merge?
    // Make a function to draw lines? 
    return (
        <div ref={divRef} className="w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 1200 1200" preserveAspectRatio="xMidYMid meet" className="w-full h-full border-2">
                <AndGate xOrigin={dimensions.width * 0.8} yOrigin={dimensions.height / 2} scale={1.5} operandOne={0} operandTwo={1} text={"A and B"} isOutput={true}/>
            </svg>
        </div>
    );
}

export default Canvas;