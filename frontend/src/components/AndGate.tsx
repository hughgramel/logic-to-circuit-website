
function AndGate({ xOrigin, yOrigin, scale, operandOne, operandTwo, text, isOutput}) {

    const x = xOrigin
    const y = yOrigin

    const WIDTH_CONST = 50
    const HEIGHT_TO_WIDTH_RATIO = 1
    const RADIUS_TO_WIDTH_RATIO = 2/5
    // Have to increase the 
    const RADIUS_ADJUSTMENT_RATIO_FOR_OUTPUT_LINE = 1.22
    


    const widthAfterScale = WIDTH_CONST * scale;
    const heightAfterScale = WIDTH_CONST * HEIGHT_TO_WIDTH_RATIO * scale;


    const topLeft = `${x},${y}`
    const topRight = `${x + widthAfterScale},${y}`
    const bottomRight = `${x + widthAfterScale},${y + heightAfterScale}`
    const bottomLeft = `${x}, ${y + heightAfterScale}`
    const radius = widthAfterScale * RADIUS_TO_WIDTH_RATIO
    const radiusStr = `${radius},${radius}`

    // Text positioning and styling
    const textX = x + widthAfterScale / 1.75; // Center the text horizontally
    const textY = y - 10 * scale; // Position above the gate, scaled
    const fontSize = 14 * scale; // Scale the font size

    const output = operandOne && operandTwo
    console.log("output: " + output)
  return (
    <>  
        <text 
            x={textX} 
            y={textY} 
            textAnchor="middle" 
            fontSize={fontSize} 
            fontFamily="Arial, sans-serif"
            fill="black"
        >
            {text}
        </text>

        <path d={`M ${topRight} A ${radiusStr} 0 0,1 ${bottomRight}`} fill="white" stroke="black" strokeWidth="3" />
        <path d={`M ${topRight} L${topLeft} L${bottomLeft} L${bottomRight}`}  fill="white" stroke="black" strokeWidth="3" />
        
        {/* Input Lines */}
        {/* <line x1="0" y1="30" x2="20" y2="30" stroke="black" strokeWidth="3" />
        <line x1="0" y1="50" x2="20" y2="50" stroke="black" strokeWidth="3" />
        <line x1="0" y1="70" x2="20" y2="70" stroke="black" strokeWidth="3" /> */}
        
        {/* Output Line */}
        {isOutput && <line 
                        x1={`${x + widthAfterScale + (radius * RADIUS_ADJUSTMENT_RATIO_FOR_OUTPUT_LINE)}`} 
                        y1={`${y + heightAfterScale / 2}`} 
                        x2={`${x + widthAfterScale + radius + 50}`} 
                        y2={`${y + heightAfterScale / 2}`} stroke="black" strokeWidth="3" /> }
    </>
  );
}

export default AndGate;
