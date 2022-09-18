import { NodeType } from "../interfaces"

const createNodes = ()=>{
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

  return myNodes
}

const resetNodes = (nodes:NodeType[][]) => {
  for(let i = 0; i < nodes.length; i++){
    for(let j = 0; j < nodes[0].length; j++){
      document.getElementById(`node-${i}-${j}`)!.classList.remove('node-visited', 'isShortestPath')
    }
  }
}

const animateSearch = (visitedNodes:number[][], path:number[][], start:number[], end:number[]) => {
  for (let i = 0; i <= visitedNodes.length; i++) {
    if (i === visitedNodes.length) {
      setTimeout(() => {
        animateShortestPath(path, start, end);
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      const node = visitedNodes[i];
      if(!(node[0] === start[0] && node[1] === start[1]) && !(node[0] === end[0] && node[1] === end[1])){
        document.getElementById(`node-${node[0]}-${node[1]}`)!.classList.add('node-visited')
      }
    }, 10 * i);
  }
}

const animateShortestPath = (path:number[][], start:number[], end:number[]) =>{
  for (let i = 0; i < path.length; i++) {
    setTimeout(() => {
      const node = path[i];
      if(!(node[0] === start[0] && node[1] === start[1]) && !(node[0] === end[0] && node[1] === end[1])){
        document.getElementById(`node-${node[0]}-${node[1]}`)?.classList.add('isShortestPath')
      }
    }, 50 * i);
  }
}

const resetPrevPath = (visitedNodes:number[][], path:number[][]) => {
  for (let i = 0; i <= visitedNodes.length; i++) {
    const node = visitedNodes[i];
    if(node) document.getElementById(`node-${node[0]}-${node[1]}`)!.classList.remove('node-visited')
  }

  for (let i = 0; i <= path.length; i++) {
    const node = path[i];
    if(node) document.getElementById(`node-${node[0]}-${node[1]}`)!.classList.remove('isShortestPath')
  }
}

export { createNodes,animateSearch, animateShortestPath, resetPrevPath, resetNodes }