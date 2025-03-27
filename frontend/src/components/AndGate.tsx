
function AndGate({ xOrigin, yOrigin, scale, operandOne, operandTwo, text, isOutput}) {

    const x = xOrigin
    const y = yOrigin

    const WIDTH_CONST = 50
    const HEIGHT_TO_WIDTH_RATIO = 1
    const RADIUS_TO_WIDTH_RATIO = 2/5
    const TEXT_X_VALUE_ADJUSTMENT_RATIO = 1.4
    


    const widthAfterScale = WIDTH_CONST * scale;
    const heightAfterScale = WIDTH_CONST * HEIGHT_TO_WIDTH_RATIO * scale;


    // const topLeft = `${x},${y}`
    // const topRight = `${x + widthAfterScale},${y}`
    // const bottomRight = `${x + widthAfterScale},${y + heightAfterScale}`
    // const bottomLeft = `${x}, ${y + heightAfterScale}`
    const radius = widthAfterScale * RADIUS_TO_WIDTH_RATIO
    const radiusStr = `${radius},${radius}`

    // Text positioning and styling
    const textX = x - widthAfterScale * TEXT_X_VALUE_ADJUSTMENT_RATIO; // Centered over the gate
    const textY = y - heightAfterScale / 2 - 8 * scale; // Positioned above the gate
    const fontSize = 14 * scale; // Scale the font size

    const output = operandOne && operandTwo


    const rectangleRightSideMiddleX = xOrigin - widthAfterScale
    const rectangleRightSideMiddleY = yOrigin
    const outputWireEndpointX = xOrigin - (widthAfterScale / 2)
    const outputWireEndpointY = yOrigin

    const topLeft = `${rectangleRightSideMiddleX - widthAfterScale},${y - heightAfterScale / 2}`
    const topRight = `${rectangleRightSideMiddleX},${y - heightAfterScale / 2}`
    const bottomRight = `${rectangleRightSideMiddleX},${y + heightAfterScale / 2}`
    const bottomLeft = `${rectangleRightSideMiddleX - widthAfterScale}, ${y + heightAfterScale / 2}`

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
        
        {isOutput && <line 
                        x1={`${xOrigin}`} 
                        y1={`${yOrigin}`} 
                        x2={`${outputWireEndpointX}`} 
                        y2={`${outputWireEndpointY}`} stroke="black" strokeWidth="3" /> }

                        <text 
            x={xOrigin + scale * 4} 
            y={yOrigin}  
            fontSize={fontSize} 
            fontFamily="Arial, sans-serif"
            fill="black"
            dominantBaseline="middle"
            >
            
            {output}
        </text>
    </>
  );
}

export default AndGate;
