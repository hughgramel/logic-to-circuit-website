import React from 'react';

interface WireConnectionProps {
  xOrigin: number;
  yOrigin: number;
  xEnd: number;
  yEnd: number;
  stroke?: string;
  strokeWidth?: number;
}

const WireConnection: React.FC<WireConnectionProps> = ({
  xOrigin, 
  yOrigin, 
  xEnd, 
  yEnd, 
  stroke = "black", 
  strokeWidth = 3
}) => {
  // If y values are different, create an L-shaped wire
  if (yOrigin !== yEnd) {
    return (
      <g>
        {/* Vertical line up/down to correct Y */}
        <line 
          x1={xOrigin} 
          y1={yOrigin} 
          x2={xOrigin} 
          y2={yEnd} 
          stroke={stroke} 
          strokeWidth={strokeWidth} 
        />
        {/* Horizontal line to final X */}
        <line 
          x1={xOrigin} 
          y1={yEnd} 
          x2={xEnd} 
          y2={yEnd} 
          stroke={stroke} 
          strokeWidth={strokeWidth} 
        />
      </g>
    );
  }
  
  // If y values are the same, draw a straight horizontal line
  return (
    <line 
      x1={xOrigin} 
      y1={yOrigin} 
      x2={xEnd} 
      y2={yEnd} 
      stroke={stroke} 
      strokeWidth={strokeWidth} 
    />
  );
};

export default WireConnection;