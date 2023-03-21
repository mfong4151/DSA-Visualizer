import React from 'react'

interface Props{
    nodeValue: string;
}

const CanvasNode: React.FC<Props> = ({nodeValue}) => {
  
  return (
    
      <button className='node'>{nodeValue}</button>
    
  )
}

export default CanvasNode
