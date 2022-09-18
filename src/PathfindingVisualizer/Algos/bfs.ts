import {NodeType} from '../interfaces'

const bfs = (graph:NodeType[][], start:number[], end:number[])=>{
  const queue:Array<[number[], number[][]]> = [[start, []]] 
  const seen = new Set<string>()
  const visitedNodes:number[][] = []
  const [endRow, endCol] = end
  if(!graph.length) return [[], visitedNodes]
  while(queue.length){
    const [curr, path] = queue.pop()!
    const [startRow, startCol] = curr 
    
    if(seen.has(`${startRow}&${startCol}`)) continue
    //if the node is a block, don't do anything
    if(curr.length && !(graph[startRow][startCol].isBlock)) {
      //add the current node into the path
      path.push(curr)

      seen.add(`${startRow}&${startCol}`)
      visitedNodes.push(curr)

      //if the current node is the end node, we're done
      if(startRow === endRow && startCol === endCol) return [path, visitedNodes]

      const neighbors = [[0, 1], [0, -1], [1, 0], [-1, 0]]

      for (let [x, y] of neighbors){
        const newX = startRow + x,
              newY = startCol + y,
              xInBound = newX >= 0 && newX < graph.length,
              yInBound = newY >= 0 && newY < graph[0].length
        if(!seen.has(`${newX}&${newY}`) && xInBound && yInBound) queue.unshift([[newX, newY], [...path]])
      }
      
      //if we haven't seen this node yet, add all of its neighbors and continue searching
      // if(!seen.has(`${startRow}&${startCol}`)){
      //   seen.add(`${startRow}&${startCol}`)
      //   visitedNodes.push(curr)
      //   const [x, y] = curr
      //   if(x+1 < graph.length && !seen.has(`${x+1}&${y}`)) queue.unshift([[x+1, y], [...path]])
      //   if(x-1 >= 0 && !seen.has(`${x-1}&${y}`)) queue.unshift([[x-1, y], [...path]])
      //   if(y+1 < graph[0].length && !seen.has(`${x}&${y+1}`)) queue.unshift([[x, y+1], [...path]])
      //   if(y-1 >= 0 && !seen.has(`${x}&${y-1}`)) queue.unshift([[x, y-1], [...path]])
      // }
    }
  }
  return [[], visitedNodes]
}

// const bfs = (graph:NodeType[][], start:number[], end:number[])=>{
//   const queue:Array<[number[], number[][]]> = [[start, []]] 
//   const seen = new Set<string>()
//   const visitedNodes:number[][] = []
//   const [endRow, endCol] = end
//   if(!graph.length) return [[], visitedNodes]
//   while(queue.length){
//     const [curr, path] = queue.pop()!
//     const [startRow, startCol] = curr 
    
//     //if the node is a block, don't do anything
//     if(curr.length && !(graph[startRow][startCol].isBlock)) {

//       //add the current node into the path
//       path.push([startRow, startCol])
//       seen.add(`${startRow}&${startCol}`)
//       visitedNodes.push([startRow, startCol])

//       //if the current node is the end node, we're done
//       if(startRow === endRow && startCol === endCol) return [path, visitedNodes]
      
//       //if we haven't seen this node yet, add all of its neighbors and continue searching

//       const neighbors = [[0, 1], [0, -1], [1, 0], [-1, 0]]

//       for (let [x, y] of neighbors){
//         const newX = startRow + x,
//               newY = startCol + y,
//               xInBound = newX >= 0 && newX < graph.length,
//               yInBound = newY >= 0 && newY < graph[0].length

//         if(!seen.has(`${newX}&${newY}`) && xInBound && yInBound) queue.unshift([[newX, newY], [...path]])
//       }
//       // if(!seen.has(`${startRow}&${startCol}`)){
//       //   seen.add(`${startRow}&${startCol}`)
//       //   visitedNodes.push(curr)
//       //   const [x, y] = curr
//       //   if(x+1 < graph.length && !seen.has(`${x+1}&${y}`)) queue.unshift([[x+1, y], path])
//       //   if(x-1 >= 0 && !seen.has(`${x-1}&${y}`)) queue.unshift([[x-1, y], path])
//       //   if(y+1 < graph[0].length && !seen.has(`${x}&${y+1}`)) queue.unshift([[x, y+1], path])
//       //   if(y-1 >= 0 && !seen.has(`${x}&${y-1}`)) queue.unshift([[x, y-1], path])
//       // }
//     }
//   }
//   return [[], visitedNodes]
// }

export default bfs