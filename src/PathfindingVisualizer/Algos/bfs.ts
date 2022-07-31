import {NodeType} from '../interfaces'

const bfs = (graph:NodeType[][], start:number[], end:number[])=>{
  const queue:Array<[number[], number[][]]> = [[start, []]] 
  const seen = new Set<string>()

  while(queue.length){
    const [curr, [...path]] = queue.pop()!

    //if the node is a block, don't do anything
    if(graph.length && curr[0] && curr[1]) {
      if(graph[curr[0]][curr[1]].isBlock) continue
    }

    //add the current node into the path
    path.push(curr)

    //if the current node is the end node, we're done
    if(curr[0] === end[0] && curr[1] === end[1]){
      return path
    }
    
    //if we haven't seen this node yet, add all of its neighbors and continue searching
    if(!seen.has(`${curr[0]}&${curr[1]}`)){
      seen.add(`${curr[0]}&${curr[1]}`)
      const [x, y] = curr
      if(x+1 < graph.length && !seen.has(`${x+1}&${y}`)) queue.unshift([[x+1, y], path])
      if(x-1 > 0 && !seen.has(`${x-1}&${y}`)) queue.unshift([[x-1, y], path])
      if(y+1 < graph[0].length && !seen.has(`${x}&${y+1}`)) queue.unshift([[x, y+1], path])
      if(y-1 > 0 && !seen.has(`${x}&${y-1}`)) queue.unshift([[x, y-1], path])
    }
  }
  return []
}

export default bfs