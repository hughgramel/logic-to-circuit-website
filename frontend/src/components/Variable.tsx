export interface VariableProps {
    varLetter: string
    xPosition: number
    yPosition: number
    status: 0 | 1
    scale?: number
}

function Variable({ varLetter, xPosition, yPosition, status, scale = 1 }: VariableProps) {
    return <>
        <text 
            x={xPosition - 10} 
            y={yPosition}  
            fontSize={24 * scale} 
            fontFamily="Arial, sans-serif"
            fill="black"
            dominantBaseline="middle"
            textAnchor="end"
        >
            {`${varLetter}: ${status}`}
        </text>
    </>

}

export default Variable;
