export class cell{
    constructor(pride?: number, prosperity?: number){
    if(pride !== undefined){
        this.pride = pride
    }
    if(prosperity !== undefined){
        this.prosperity = prosperity
    }
    }
    
    private prideMin = -50
    private prosperityMin = 0
    private prideMax = 50
    private prosperityMax = 100
    getRgb(){
      const prosperityFactor = (this.prosperity / this.prosperityMax)
      const prideMid = (this.prideMin + this.prideMax) / 2
  
      let r=255 
      let g=0
      let b=255
  
      if(this.pride > prideMid){
        b -= (this.pride-prideMid)*(255/this.prideMax)*2
        g=b
      } else {
        r -= (prideMid-this.pride)*(255/this.prideMax)*2
        g=r
      }
  
      r*=prosperityFactor
      g*=prosperityFactor
      b*=prosperityFactor
  
      return `rgb(${r},${g},${b})`
    }
  
    increasePride(num: number=1){
      this.pride += num
      if(this.pride > this.prideMax){
        this.pride = this.prideMax
      }
      if(this.pride < this.prideMin){
        this.pride = this.prideMin
      }
    }
    increaseProsperity(num: number=1){
      this.prosperity += num
      if(this.prosperity > this.prosperityMax){
        this.prosperity = this.prosperityMax
      }
      if(this.prosperity < this.prosperityMin){
        this.prosperity = this.prosperityMin
      }
    }
  
    public pride = (this.prideMax + this.prideMin)/2
    public prosperity = (this.prosperityMax + this.prosperityMin)/2
  }


export class grid{
    public data: cell[][]
    public height: number
    public width: number

    constructor(width: number, height: number){
        const data: cell[][] = []
        for(let y=0; y<height; y++){
            data.push([])
            for(let x=0; x<width; x++){x
                data[y].push(new cell())
            }
        }
        this.data=data
        this.width=width
        this.height=height
    }

    getCell(x: number,y: number): cell{
        return this.data[y][x]
    }

    getSurroundingCells(x: number,y: number): cell[]{
        const surrounding: number[][] = [
            [-1,-1],
            [-1,0],
            [-1,1],
            [0,-1],
            [0,1],
            [1,-1],
            [1,0],
            [1,1],
        ]
        const result: cell[] = []
        for(let item of surrounding){
            const resultX = x+item[0]
            const resultY = y+item[1]
            const lessThanGridLengthCheck = resultY < this.data.length && resultX < this.data[0].length
            const atLeastZeroCheck = resultY >= 0 && resultX >= 0
            const withinGridBounds = lessThanGridLengthCheck && atLeastZeroCheck
            if(withinGridBounds){
                result.push(this.data[resultY][resultX])
            }
        }
        return result
    }
}