import { useLayoutEffect, useRef, useState } from 'react';
import AndGate from './AndGate';

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

  
    return (
        <div ref={divRef} className="w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 1200 1200" preserveAspectRatio="xMidYMid meet" className="w-full h-full border-2">
                <AndGate xOrigin={dimensions.width * 0.8} yOrigin={dimensions.height / 2} scale={1.5} operandOne={0} operandTwo={1} text={"A and B"} isOutput={true}/>
            </svg>
        </div>
    );
}

export default Canvas;