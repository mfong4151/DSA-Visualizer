import './graphs.css'
import { useEffect, useState } from "react";
import GraphMatrix from './Matrix'
import { createNewMatrix } from "./utils/graphUtils";
import MatrixBanner from './MatrixBanner/MatrixBanner';
import { pos, startStop } from '../types/positions';
import { bfsItterator } from './utils/algorithims/matrixBFS';

  
const Graphs: React.FC = ()=>{
    const [matrixNodes, setMatrixNodes] = useState<boolean>(true); //true === matrix, false === nodes
    const [matrixDim, setMatrixDim]  = useState<pos>({y: 30, x: 30});
    const [matrix, setMatrix] = useState<string[][]>(createNewMatrix(matrixDim.y, matrixDim.x));
    const [startEndPos, setStartEndPos] = useState<startStop>({start:{y: -1, x: -1}, end: {y: -1, x: -1}})
    const [chosenAlgo, setChosenAlgo] = useState<string>('Choose your algorithim')
    const [nodes, setNodes] = useState<any[]>([]);
    const matrixState = {matrix, setMatrix};
    let itterator;

    

    return(
      <div className='font-color'>

        <MatrixBanner matrixBannerStates={{matrixNodes, setMatrixNodes, setMatrix, matrix, matrixDim, setMatrixDim, chosenAlgo, setChosenAlgo, startEndPos, setStartEndPos}}/>  

        
         <div className='page-body'>
            <section id='page-left' className='tab-bg'>
            </section>
            <div className='adjbar'/>
            <section id='page-right' className='udc tab-bg'>
                {matrixNodes && <GraphMatrix matrixState={matrixState} startEndState ={{startEndPos, setStartEndPos}}/>}

            </section>  

        </div>
      
      </div>
    );

}


export default Graphs;