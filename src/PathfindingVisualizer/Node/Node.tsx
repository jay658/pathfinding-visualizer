import React, {useState} from 'react'

import './Node.css'

interface NodeProps{
  row:number,
  col:number,
  startOrEnd:string,
  start:number[],
  end:number[],
  handleStart:(row:number, col:number) => void,
  handleEnd:(row:number, col:number) => void
}

const Node:React.FC<NodeProps> = (props:NodeProps)=>{
  const {handleStart, handleEnd, start, end, row, col, startOrEnd} = props

  const handleClick=()=>{
    if(startOrEnd === 'start') handleStart(row, col)
    else handleEnd(row, col)
  }
  
  return(
    <div className={`node ${row === start[0] && col === start[1]? "isStart" : ""} ${row === end[0] && col === end[1]? "isEnd" : ""}`} onClick={handleClick}>
      
    </div>
  )
}

export default Node