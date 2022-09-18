import React, {useState} from 'react'

import './Node.css'

interface NodeProps{
  row:number,
  col:number,
  clickBox:string,
  start:number[],
  end:number[],
  handleStart:(row:number, col:number) => void,
  handleEnd:(row:number, col:number) => void,
  handleBarrier:(row:number, col:number) => void,
  isBlock?:boolean
}

const Node:React.FC<NodeProps> = (props:NodeProps)=>{
  const {handleStart, handleEnd, handleBarrier, start, end, row, col, clickBox, isBlock} = props
  const[startX, startY] = start
  const [endX, endY] = end
  const isStart = row === startX && col === startY
  const isEnd = row === endX && col === endY

  const handleClick=()=>{
    if(clickBox === 'start') handleStart(row, col)
    else if(clickBox ==='end') handleEnd(row, col)
    else handleBarrier(row, col)
  }

  return(
    <div id={`node-${row}-${col}`} className={`node ${isStart? "isStart" : isEnd? "isEnd" : isBlock? 'isBlock': ''}`} onClick={handleClick}>
      
    </div>
  )
}

export default Node