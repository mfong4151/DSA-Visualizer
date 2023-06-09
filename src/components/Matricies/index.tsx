import './graphs.css'
import {FC, useRef, useEffect, useLayoutEffect } from "react";
import GraphMatrix from './Matrix'
import {transplantMatrix } from "./MatrixBanner/MatrixRemote/utils/graphUtils";
import MatrixBanner from './MatrixBanner/MatrixBanner';
import UIConsole from '../Nodulars/UIConsole';
import { consoleContentState, errorsState } from '../types/state';
import useUIStates from '../hooks/useUIStates';
import useWindowSize from '../hooks/useWindowSize';
import useMatrixStates from '../hooks/useMatrixStates';
import { windowDim } from '../types/windowDim';
import { matrixItemObject } from '../types/objects';
import { startStop } from '../types/positions';
import { calculateResize, calculateResizeMobile} from '../utils/resizeCanvas';
import useCanvasResize from '../hooks/useCanvasResize';

//For any child components of matricies, if its not explicitly in the folder, that means we've taken it from its counterpart in Nodepage


const Matricies: FC = ()=>{
    const {matrixDim, setMatrixDim, matrix, setMatrix, startEndPos, setStartEndPos } = useMatrixStates();
    const {consoleContent,  setConsoleContent,  isPlaying,  setIsPlaying, errors,  setErrors} = useUIStates()
    
    const matrixState = {matrix, setMatrix};
    const windowDim: windowDim = useWindowSize()

    const consoleContentState: consoleContentState = {consoleContent, setConsoleContent}
    const errorsState:errorsState = {errors, setErrors};

    const pageLeftRef = useRef<HTMLDivElement>(null);
    const pageRightRef = useRef<HTMLDivElement>(null);
    const adjBarRef = useRef<HTMLDivElement>(null);
    const matrixRef = useRef<any>();

    useEffect(() => {
      matrixRef.current = document.getElementById("matrix");
    }, [matrix])
    

    useEffect(()=>{

      const resizeableLeft = pageLeftRef.current;
      const stylesLeft: CSSStyleDeclaration = window.getComputedStyle(resizeableLeft!);
      let widthLeft:number = parseInt(stylesLeft.width, 10)
      if(!resizeableLeft) return 

      let x:number = 0;
      
      const onMouseMoveLRResize =  (e:any) =>{
        const dx: number = e.clientX - x;
        widthLeft = widthLeft + (1.5 * dx);
        x = e.clientX
        resizeableLeft.style.width! = `${widthLeft}px`
      }
      
      const onMouseUpLRResize = (e:any) => document.removeEventListener("mousemove", onMouseMoveLRResize);

      const onMouseDownRightResize = (e:any) =>{

        x = e.clientX;
        resizeableLeft.style.left = stylesLeft.left
        resizeableLeft.style.right = '';
        document.addEventListener("mousemove", onMouseMoveLRResize);
        document.addEventListener("mouseup", onMouseUpLRResize);


      }

      const resizerRight = adjBarRef.current
      if(!resizerRight) return 
      resizerRight.addEventListener("mousedown", onMouseDownRightResize);

      return ()=> {
        resizerRight.removeEventListener("mousedown", onMouseDownRightResize)

      }
    }, [])
    
    useLayoutEffect(()=>{

      const pageRightDiv = pageRightRef.current!;
      const matrixDiv = matrixRef.current!;  

      if(isPlaying  || (!pageRightDiv && !matrixDiv)) return 
      
      const [rows, cols]:[number, number] = windowDim.width > 600 
                                            ? calculateResize(matrixDim, pageRightDiv, matrixDiv)
                                            : calculateResizeMobile(matrixDim, pageRightDiv, matrixDiv)
      const [newMatrix, newStartEnd]:[matrixItemObject[][], startStop] = transplantMatrix(rows, cols, startEndPos)
     
      setMatrix(newMatrix)
      setStartEndPos(newStartEnd)

    },[windowDim])
    
    return(
      <div className={`font-color ${isPlaying && 'unclickable'}`}>
        <MatrixBanner 
                matrixState = {matrixState}
                matrixDimState= {{ matrixDim,setMatrixDim}}
                startEndPosState ={{ startEndPos, setStartEndPos}}
                consoleContentState = {consoleContentState}
                isPlayingState = {{isPlaying, setIsPlaying}}
                errorsState = {errorsState}
                pageRightDiv = {pageRightRef.current}
                matrixDiv = {matrixRef.current}
          />  

         <div className='page-body'>
          <section id='page-left' className='tab-bg'ref={pageLeftRef} >
              <div className='udc-no-vertical console-holder'>
                {windowDim.width > 600 && <UIConsole consoleContent={consoleContent} isPlaying={isPlaying} errors={errorsState}/>}
              </div>
              <div id='adjbar' className='udc' ref={adjBarRef}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 2 14" 
                    width="2" 
                    height="14" 
                    fill="currentColor"
                    className="text-gray-3 dark:text-dark-gray-3 transition -translate-y-6 group-hover:text-white dark:group-hover:text-white">
                  <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 1)"/>
                  <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 7)"/>
                  <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 13)"/>
                </svg>
              </div>
            </section>
            
            <section id='page-right' className='udc-no-vertical tab-bg' ref={pageRightRef}>
                  <GraphMatrix 
                    matrixState={matrixState} 
                    startEndState ={{startEndPos, setStartEndPos}}
                    consoleContentState={{consoleContent, setConsoleContent}}
                    matrixRef = {matrixRef}
                    />
            </section>    

        </div>
      </div>
    );

}


export default Matricies;