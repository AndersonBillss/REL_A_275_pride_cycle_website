const prideMin: number = -50
const prosperityMin: number = 0

const prideMax: number = 50
const prosperityMax: number = 100

const prideNeutral: number = (prideMax + prideMin)/2
const prosperityNeutral: number = (prosperityMax + prosperityMin)/2

export const gridHeight: number = 50
export const gridWidth: number = 50

export interface cell {
  pride: number,
  prosperity: number,
}

export function getRgb(targetCell: cell){
  const prosperityFactor = (targetCell.prosperity / prosperityMax)

  let r=255 
  let g=0
  let b=255

  if(targetCell.pride > prideNeutral){
    b -= (targetCell.pride-prideNeutral)*(255/prideMax)*2
    g=b
  } else {
    r -= (prideNeutral-targetCell.pride)*(255/prideMax)*2
    g=r
  }

  r*=prosperityFactor
  g*=prosperityFactor
  b*=prosperityFactor

  return `rgb(${r},${g},${b})`
}

export function increasePride(targetCell: cell, num: number=1){
  targetCell.pride += num
  if(targetCell.pride > prideMax){
    targetCell.pride = prideMax
  }
  if(targetCell.pride < prideMin){
    targetCell.pride = prideMin
  }
}
export function increaseProsperity(targetCell: cell, num: number=1){
  targetCell.prosperity += num
  if(targetCell.prosperity > prosperityMax){
    targetCell.prosperity = prosperityMax
  }
  if(targetCell.prosperity < prosperityMin){
    targetCell.prosperity = prosperityMin
  }
}

export function createGrid(): cell[][]{
  const data: cell[][] = []
  for(let y=0; y<gridHeight; y++){
      data.push([])
      for(let x=0; x<gridWidth; x++){x
          data[y].push({
            pride: prideNeutral,
            prosperity: prosperityNeutral
          })
      }
  }
  return data
}

export function getCell(data: cell[][], x: number,y: number): cell{
  return data[y][x]
}

export function getSurroundingCells(data: cell[][], x: number,y: number): cell[]{
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
      const lessThanGridLengthCheck = resultY < data.length && resultX < data[0].length
      const atLeastZeroCheck = resultY >= 0 && resultX >= 0
      const withinGridBounds = lessThanGridLengthCheck && atLeastZeroCheck
      if(withinGridBounds){
          result.push(data[resultY][resultX])
      }
  }
  return result
}