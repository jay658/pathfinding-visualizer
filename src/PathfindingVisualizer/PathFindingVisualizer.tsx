import React, {ChangeEvent, useEffect, useState} from 'react'
import Node from './Node/Node'

import './PathFindingVisualizer.css'

interface NodeType{
  row:number;
  col:number;
}

const PathFindingVisualizer: React.FC = ()=>{
  const [nodes, setNodes] = useState<NodeType[][]>([]) 
  const [start, setStart] = useState<number[]>([])
  const [end, setEnd] = useState<number[]>([])
  const [startOrEnd, setStartOrEnd] = useState<string>('start')

  useEffect(()=>{
    const myNodes:NodeType[][] = []

    for(let row = 0; row < 40; row++){
      const currentRow = []
      for(let col = 0; col < 20; col++){
        const currentNode:NodeType = {
          row:row+1,
          col:col+1
        }
        currentRow.push(currentNode)
      }
      myNodes.push(currentRow)
    }
    setNodes(myNodes)
  }, [])

  const handleStart = (row:number, col:number) => {
    setStart([row, col])
  }

  const handleEnd = (row:number, col:number) => {
    setEnd([row, col])
  }

  const handleFormChange = (ev:ChangeEvent<HTMLSelectElement>)=>{
    setStartOrEnd(ev.target.value)
  }

  return(
    <>
      <div>Algo Visualizer</div>
        <select value={startOrEnd} onChange={handleFormChange}>
          <option value='start'>Pick Start</option>
          <option value='end'>Pick End</option>
        </select>

      <div className='grid'>
        {nodes.map((row:NodeType[], idx)=>{
          return(
            <div key={idx} className='row'>
              {row.map((node:NodeType, nodeIdx)=>{
                const {row, col} = node
                return(
                  <Node key={nodeIdx} start={start} end={end} handleStart={handleStart} handleEnd={handleEnd} row={row} col={col} startOrEnd={startOrEnd}/>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default PathFindingVisualizer