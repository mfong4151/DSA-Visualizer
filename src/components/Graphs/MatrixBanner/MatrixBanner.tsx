import React, { useEffect } from 'react';
import { createNewMatrix } from '../utils/graphUtils';
import { useState } from 'react';
import ChooseAlgoModal from './ChooseAlgoModal';
import {pos, startStop } from '../../types/positions';
import Remote from '../../generalComponents/Remote';
import '../../Graphs/graphs.css'

interface Props{
  matrixBannerStates:{
    matrixNodes: boolean,
    setMatrixNodes: React.Dispatch<React.SetStateAction<boolean>>,
    matrix: string[][],
    setMatrix: React.Dispatch<React.SetStateAction<string[][]>>,
    matrixDim: pos,
    setMatrixDim: React.Dispatch<React.SetStateAction<pos>>
    startEndPos: startStop,
    setStartEndPos:React.Dispatch<React.SetStateAction<startStop>>
  }
}

const MatrixBanner:React.FC<Props> = ({matrixBannerStates}) => {
  const [chooseAlgoModal, setChooseAlgoModal] = useState<boolean>(false)
  const [chosenAlgo, setChosenAlgo] = useState<string>('Choose your algorithim')

  const {matrixNodes, setMatrixNodes, matrix, setMatrix, matrixDim, setMatrixDim, startEndPos} = matrixBannerStates;


  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>, origin: string) =>{
    e.preventDefault();
    e.stopPropagation()

    const newMatrixDim = {...matrixDim}
    if (origin === 'height') newMatrixDim['y'] = Number(e.target.value);
    else newMatrixDim['x'] = Number(e.target.value);

    setMatrixDim(prev => newMatrixDim)
    return
  }

  useEffect(()=>{
    setMatrix(prev => createNewMatrix(matrixDim.y, matrixDim.x))

  }, [matrixDim])

  return (
    <div id='banner' className='udc-left fdr'>

          <button   
              className='sq-buttons banner-button udc'
              onClick={()=> setMatrixNodes(!matrixNodes)}
              >
            {`Change to ${matrixNodes ? 'nodes' : 'matrix'}`}
          </button>

          <button  
              className='sq-buttons banner-button udc'
              onClick={() => setMatrix(createNewMatrix(matrixDim.y, matrixDim.x))}>
              Reset Matrix
          </button>

          {matrixNodes && <div className='fdr udc-left'>

            <form>
              <input placeholder='Set height' onChange={e => handleOnChange(e,'height')}/>

            </form>
            <form>
              <input placeholder='Set width' onChange={e => handleOnChange(e,'width')}/>

            </form>
            
          </div>}

          <button className='sq-buttons banner-button udc' onClick={()=>setChooseAlgoModal(!chooseAlgoModal)}>
            {chosenAlgo}
          </button>
          
          
          {chooseAlgoModal && <ChooseAlgoModal chooseModalState ={{chooseAlgoModal, setChooseAlgoModal}} chooseAlgoState={{chosenAlgo, setChosenAlgo}}/> }

          <Remote chosenAlgo={chosenAlgo} matrixState={{matrix, setMatrix}} startEndPos={startEndPos}/>

        </div>
  )
}

export default MatrixBanner
