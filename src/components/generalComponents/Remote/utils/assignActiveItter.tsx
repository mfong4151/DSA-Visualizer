import { startStop } from "../../../types/positions";
import { BFSItteratorMatrix } from "../../../Graphs/utils/algorithims/matrixBFS";
import { DFSItteratorMatrix } from "../../../Graphs/utils/algorithims/matrixDFS";
import { itterator } from "../../../types/itterator";
import { matrixItemObject } from "../../../types/objects";

const assignActiveItterator = (chosenAlgo:string, startEndPos: startStop, matrix: matrixItemObject[][]) =>{
    
    let itter: itterator
    const start: number[] = [startEndPos.start.x, startEndPos.start.y]
    const end: number[] = [startEndPos.end.x, startEndPos.end.y]

    switch(chosenAlgo) {
      case 'BFS':
        itter = new BFSItteratorMatrix(start, end, matrix);
        break
        case 'DFS':
        itter = new DFSItteratorMatrix(start, end, matrix);
        break

      default:
        itter = null
        break
    }

    return itter
}

export default assignActiveItterator;