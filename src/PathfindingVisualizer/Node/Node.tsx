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
  path:number[][],
  isBlock?:boolean
}

const Node:React.FC<NodeProps> = (props:NodeProps)=>{
  const {handleStart, handleEnd, handleBarrier, start, end, row, col, clickBox, path, isBlock} = props

  const isOnPath = path?.find(path=> path[0] === row && path[1] === col)
  const isStart = row === start[0] && col === start[1]
  const isEnd = row === end[0] && col === end[1]

  const handleClick=()=>{
    if(clickBox === 'start') handleStart(row, col)
    else if(clickBox ==='end') handleEnd(row, col)
    else handleBarrier(row, col)
  }

  return(
    <div className={`node ${isStart? "isStart" : ""} ${isEnd? "isEnd" : ""} ${isOnPath && !isStart && !isEnd? 'isPath' : ''} ${isBlock? 'isBlock': ''}`} onClick={handleClick}>
      
    </div>
  )
}

export default Node