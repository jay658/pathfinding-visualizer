import React, {ChangeEvent, useEffect, useState} from 'react'
import Node from './Node/Node'
import bfs from './Algos/bfs';
import dfs from './Algos/dfs';
import {NodeType} from './interfaces'
import { createNodes, animateSearch, resetPrevPath, resetNodes } from './Misc/Misc'

import './PathFindingVisualizer.css'

const PathFindingVisualizer: React.FC = ()=>{
  const [nodes, setNodes] = useState<NodeType[][]>([]) 
  const [start, setStart] = useState<number[]>([])
  const [end, setEnd] = useState<number[]>([])
  const [clickBox, setClickBox] = useState('start')
  const [path, setPath] = useState<number[][]>([])
  const [algo, setAlgo] = useState('breadth first search')
  const [visitedNodes, setVisitedNodes] = useState<number[][]>([])

  useEffect(()=>{
    if(!nodes.length){
      const myNodes = createNodes()
      setNodes(myNodes)
    }
  }, [nodes])

  const handleStart = (row:number, col:number) => {
    setStart([row, col])
  }

  const handleEnd = (row:number, col:number) => {
    setEnd([row, col])
  }

  const handleBarrier = (row:number, col:number) => {
    const newNodes = nodes.map(currRow =>{
      return currRow.map(node =>{
        if(node.row === row && node.col === col) {
          node.isBlock = !node.isBlock
          document.getElementById(`node-${row}-${col}`)!.classList.remove('node-visited', 'isShortestPath')
        }
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

  const handleReset = (visited:number[][] = visitedNodes, currPath:number[][]=path, newStart:number[] = [], newEnd:number[]=[], newAlgo:string = 'breadth first search', newClick ='start') =>{
    resetPrevPath(visitedNodes, path)
    resetNodes(nodes)
    setStart(newStart)
    setEnd(newEnd)
    setAlgo(newAlgo)
    setPath(currPath)
    setVisitedNodes(visited)
    setClickBox(newClick)
  }

  const visualizeSearch = async () => {
    resetPrevPath(visitedNodes, path)
    animateSearch(visitedNodes, path, start, end)
  }

  useEffect(()=>{
    if(end.length && algo === 'breadth first search'){
      const [returnedPath, visited] = bfs(nodes, start, end)!
      handleReset(visited, returnedPath, start, end, algo, clickBox)
    }
  }, [start, nodes])

  useEffect(()=>{
    if(start.length && algo === 'breadth first search'){
      const [returnedPath, visited] = bfs(nodes, start, end)!
      handleReset(visited, returnedPath, start, end, algo, clickBox)
    }
  }, [end, nodes])

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
      <button onClick={visualizeSearch}>Visualize Search</button>
      <button onClick={()=>handleReset(visitedNodes, path)}>Reset</button>

      <div className='grid'>
        {nodes.map((row:NodeType[], idx)=>{
          return(
            <div key={idx} className='row'>
              {row.map((node:NodeType, nodeIdx)=>{
                const {row, col, isBlock} = node
                return(
                  <Node key={nodeIdx} start={start} end={end} handleStart={handleStart} handleEnd={handleEnd} handleBarrier={handleBarrier} row={row} col={col} isBlock={isBlock} clickBox={clickBox}/>
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