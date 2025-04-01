import { useEffect, useState } from "react";
import {Input} from '@shared/types/Input'
import { Gate } from "@shared/types/Gate";


export interface AndGateProps {
    xOrigin: number;
    yOrigin: number;
    scale: number;
    text: string;
    isOutput: boolean;
}

function AndGate({ xOrigin, yOrigin, scale, text, isOutput }: AndGateProps) {

    const x = xOrigin
    const y = yOrigin

    const WIDTH_CONST = 50
    const HEIGHT_TO_WIDTH_RATIO = 1
    const RADIUS_TO_WIDTH_RATIO = 2/5
    const TEXT_X_VALUE_ADJUSTMENT_RATIO = 1.4
    


    const widthAfterScale = WIDTH_CONST * scale;
    const heightAfterScale = WIDTH_CONST * HEIGHT_TO_WIDTH_RATIO * scale;


    // const topLeftString = `${x},${y}`
    // const topRightString = `${x + widthAfterScale},${y}`
    // const bottomRightString = `${x + widthAfterScale},${y + heightAfterScale}`
    // const bottomLeftString = `${x}, ${y + heightAfterScale}`
    const radius = widthAfterScale * RADIUS_TO_WIDTH_RATIO
    const radiusStr = `${radius},${radius}`

    // Text positioning and styling
    const textX = x - widthAfterScale * TEXT_X_VALUE_ADJUSTMENT_RATIO; // Centered over the gate
    const textY = y - heightAfterScale / 2 - 8 * scale; // Positioned above the gate
    const fontSize = 14 * scale; // Scale the font size





    // INPUTS
    const inputCount = 2
    const heightAdjustmentForOutputBasedOnInputCount = (heightAfterScale / (2))


    const rectangleRightSideMiddleX = xOrigin - widthAfterScale
    const rectangleRightSideMiddleY = yOrigin
    const outputWireEndpointX = xOrigin - widthAfterScale * 0.86
    const outputWireEndpointY = yOrigin

    const topLeftX = rectangleRightSideMiddleX - widthAfterScale
    const topLeftY = y - heightAfterScale / 2

    const topLeftString = `${topLeftX},${topLeftY}`
    const topRightString = `${rectangleRightSideMiddleX},${y - heightAfterScale / 2}`
    const centerRight = `${rectangleRightSideMiddleX},${y}`
    const bottomLeftString = `${rectangleRightSideMiddleX - widthAfterScale}, ${y + heightAfterScale / 2}`




  return (
    <>  
        {/* Here is the text box for the actual operation */}
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

        
        {/* Square and curve for rendering the box */}
        <path d={`M ${topLeftString} L${bottomLeftString} L${centerRight} L${topLeftString} `}  fill="white" stroke="black" strokeWidth="3" />
        <circle r={scale * 5} fill="white" stroke="black" strokeWidth="3"  cx={rectangleRightSideMiddleX + scale * 3} cy={y}/>


        <line 
            x1={`${topLeftX}`} 
            y1={`${topLeftY + heightAdjustmentForOutputBasedOnInputCount * (1)}`} 
            x2={`${topLeftX - widthAfterScale}`} 
            y2={`${topLeftY + heightAdjustmentForOutputBasedOnInputCount * (1)}`} stroke="black" strokeWidth="3" 
        /> 

        {/* Output line and text for the output */}
        {
            <>
                {/* Output line */}
                
                <line 
                    x1={`${xOrigin}`} 
                    y1={`${yOrigin}`} 
                    x2={`${outputWireEndpointX}`} 
                    y2={`${outputWireEndpointY}`} stroke="black" strokeWidth="3" 
                /> 

                {/* Output text (0 or 1)*/}


            </>
        }
    </>
  );
}

export default AndGate;
