import { useLayoutEffect, useRef, useState } from 'react';
import AndGate from './AndGate';
import { AndOperator } from '@shared/types/AndOperator';
import { OrOperator } from '@shared/types/OrOperator';
import { NotOperator } from '@shared/types/NotOperator';
import { BinaryTree, Node } from '../../../shared/src/types/BinaryTree';
import WireConnection from './WireConnection';

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


    const and =  new AndOperator(0, 1)
    console.log(and.print() + " = " + and.eval())
    const not = new NotOperator(new OrOperator(0, 0));
    console.log(not.print() + " = " + not.eval())


    

    const correctTree = BinaryTree.createBinaryExpressionTreeFromPostFixNotation("a b + c d e + * *".split(" "))
    correctTree.print()



    function inorderTraversal(tree: BinaryTree<string>): string[] {
        const result: string[] = [];
        let startingX = 1200
        let startingY = 1200 / 2
        
        let currentLevel = 0;
        function printNode(node: Node<string>, prefix: string, isLeft: boolean) {
            if (!node) return;
    
            currentLevel++;
    
            // Print right subtree first (top of the visualization)
            if (node.right) {
                printNode(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
            }
    
            // Print current node with indentation
            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    
            // Print left subtree (bottom of the visualization)
            if (node.left) {
                printNode(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
            }
    
            currentLevel--;
        }
    

        function traverse(node: Node<string> | null) {
            if (!node) return;
    
            // Visit current node (add to result)
            result.push(node.value);

            // First, traverse left subtree
            if (node.left) {

                traverse(node.left);
            }
            
            if (true) {
                console.log(`\nCurrent Node: ${node.value}`);
                printNode(node, '', true);
            }
            
    
            // Then, traverse right subtree
            if (node.right) {
                traverse(node.right);
            }

        }
    
        // Start traversal from the root
        if (tree.root) {
            traverse(tree.root);
        }
    
        return result;
    }

    console.log(inorderTraversal(correctTree))
    


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
    return (
        <div ref={divRef} className="w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 1200 1200" preserveAspectRatio="xMidYMid meet" className="w-full h-full border-2">
                <AndGate xOrigin={1200 } yOrigin={1200 / 2} scale={1} operandOne={1} operandTwo={0} text={""} isOutput={false}/>
                <AndGate xOrigin={1075 } yOrigin={(1200 / 2) +  75} scale={1} operandOne={1} operandTwo={0} text={""} isOutput={false}/>
                <AndGate xOrigin={1075 } yOrigin={(1200 / 2) -  75} scale={1} operandOne={1} operandTwo={0} text={""} isOutput={false}/>
                <AndGate xOrigin={950 } yOrigin={(1200 / 2) +  150} scale={1} operandOne={1} operandTwo={0} text={""} isOutput={false}/>
                <AndGate xOrigin={950 } yOrigin={(1200 / 2) -  150} scale={1} operandOne={1} operandTwo={0} text={""} isOutput={false}/>
                <AndGate xOrigin={950 } yOrigin={(1200 / 2) +  0} scale={1} operandOne={1} operandTwo={0} text={""} isOutput={false}/>
                <AndGate xOrigin={950 } yOrigin={(1200 / 2) -  150} scale={1} operandOne={1} operandTwo={0} text={""} isOutput={false}/>
                <WireConnection 
  xOrigin={1200} 
  yOrigin={600} 
  xEnd={500} 
  yEnd={400} 
/>
            </svg>
        </div>
    );
}

export default Canvas;