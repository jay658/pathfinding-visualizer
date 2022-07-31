import React, {ChangeEvent, useEffect, useState} from 'react'
import Node from './Node/Node'
import bfs from './Algos/bfs';
import {NodeType} from './interfaces'

import './PathFindingVisualizer.css'

const PathFindingVisualizer: React.FC = ()=>{
  const [nodes, setNodes] = useState<NodeType[][]>([]) 
  const [start, setStart] = useState<number[]>([])
  const [end, setEnd] = useState<number[]>([])
  const [clickBox, setClickBox] = useState<string>('start')
  const [path, setPath] = useState<number[][]>([])
  const [algo, setAlgo] = useState<string>('breadth first search')

  useEffect(()=>{
    const myNodes:NodeType[][] = []

    for(let row = 0; row < 40; row++){
      const currentRow = []
      for(let col = 0; col < 20; col++){
        const currentNode:NodeType = {
          row:row,
          col:col,
          isBlock:false
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

  const handleBarrier = (row:number, col:number) => {
    const newNodes = nodes.map(currRow =>{
      return currRow.map(node =>{
        if(node.row === row && node.col === col) node.isBlock = !node.isBlock
        return node
      })
    })

    setNodes(newNodes)
  }

  const handleStartEndChange = (ev:ChangeEvent<HTMLSelectElement>)=>{
    setClickBox(ev.target.value)
  }

  const handleAlgoChange = (ev:ChangeEvent<HTMLSelectElement>)=>{
    setPath([])
    setAlgo(ev.target.value)
  }

  const handleReset = () =>{
    const myNodes:NodeType[][] = []

    for(let row = 0; row < 40; row++){
      const currentRow = []
      for(let col = 0; col < 20; col++){
        const currentNode:NodeType = {
          row:row,
          col:col,
          isBlock:false
        }
        currentRow.push(currentNode)
      }
      myNodes.push(currentRow)
    }
    setNodes(myNodes)

    setStart([])

    setEnd([])

    setAlgo('breadth first search')
  }

  useEffect(()=>{
    if(algo === 'breadth first search') setPath(bfs(nodes, start, end)!)
    console.log(bfs(nodes, start, end))
  }, [algo, nodes, start, end])

  return(
    <div className='mainContainer'>
      <div>Algo Visualizer</div>
      <select value={clickBox} onChange={handleStartEndChange}>
        <option value='start'>Pick Start</option>
        <option value='end'>Pick End</option>
        <option value='block'>Set Barriers</option>
      </select>

      <select value={algo} onChange={handleAlgoChange}>
        <option value='breadth first search'>BFS</option>
        <option value='depth first search'>DFS</option>
      </select>

      <button onClick={handleReset}>Reset</button>

      <div className='grid'>
        {nodes.map((row:NodeType[], idx)=>{
          return(
            <div key={idx} className='row'>
              {row.map((node:NodeType, nodeIdx)=>{
                const {row, col, isBlock} = node
                return(
                  <Node key={nodeIdx} start={start} end={end} handleStart={handleStart} handleEnd={handleEnd} handleBarrier={handleBarrier} row={row} col={col} isBlock={isBlock} clickBox={clickBox} path={path}/>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PathFindingVisualizer