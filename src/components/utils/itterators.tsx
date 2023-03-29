import { pathObject } from "../types/classes";
import { matrixItemObject } from "../types/objects";

export class MatrixItterator{
    protected dirs: number[][];
    protected visited: Set<string>;
    public matrix:matrixItemObject ;
    public rows:number;
    public cols:number;
    public end: number[];
    public start: number[];
    public prev: number[];
    public res: pathObject[];
    public endFound: boolean;
    
    constructor(start:number[], end:number[], matrix:matrixItemObject[][] ){
        this.end = end;
        this.res = [];
        this.prev = [-1, -1];
        this.start = start
        this.visited = new Set();
        this.matrix = matrix;
        this.rows = matrix.length;
        this.cols = matrix[0].length;
        this.endFound = false;
        this.dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]];
    }
    

    //meant to be overridden, used as a reference.
    //All these methods should exist on the child classes
    public isValidNext():boolean {

        return true;
    }

    public showContainer(): number[][]{
        return [[]]
    }

    public next(){
        return 
    }

    public preformFullAlgo(): pathObject[]{

        return []
    }
    // public isEnd(node:number):boolean{
        
    //     return true;

    // }

    //except for these, these actually do stuff

    public isStart(node:number[]):boolean{
        if (node[0] === this.start[0] && node[1] === this.start[1]) return true;
        return false

    }

    public generateShortestPath():number[][]{
        if (!this.endFound) return [[]]
        const res: number[][] = []
        let curr:matrixItemObject = this.matrix[this.end[1]][this.end[0]]
    
        while ((curr.prev[0] !== this.start[0]) && (curr.prev[1] !== this.start[1])){
            res.push(curr.prev)
            curr = this.matrix[curr.prev[1]][curr.prev[0]]
        }

        return res
    }

    public reanimatePastChanges(): matrixItemObject {
        return this.matrix;
    }

}


