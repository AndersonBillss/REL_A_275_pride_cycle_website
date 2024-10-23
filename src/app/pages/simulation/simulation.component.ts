import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import * as gridUtils from '../../utils/grid';

@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [
    MatSliderModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss'
})
export class SimulationComponent implements OnInit{
  public speed: number=5
  public playing = false


  public gridWidth: number = 50;
  public gridHeight: number = 50;
  public simulationGrid: gridUtils.cell[][] = gridUtils.createGrid()


  ngOnInit(): void {
  }

  togglePlay(){
    this.playing = !this.playing
    if(this.playing){
      this.simulate()
    }
  }


  simulate(){
    this.simulationGrid = this.calculateNextGrid()
    if(this.playing){
      setTimeout(() =>{
        requestAnimationFrame(() => this.simulate())
      }, 1000/this.speed)
    }
  }

  calculateNextGrid(): gridUtils.cell[][]{
    let newGrid: gridUtils.cell[][] = gridUtils.createGrid()

    for(let x=0; x<gridUtils.gridWidth; x++){
      for(let y=0; y<gridUtils.gridHeight; y++){
        const box = gridUtils.getCell(this.simulationGrid, x,y)
        const newBox = gridUtils.getCell(newGrid, x,y)
        newBox.pride = box.pride
        newBox.prosperity = box.prosperity

        const surroundingCells = gridUtils.getSurroundingCells(this.simulationGrid, x,y)
        let totalPride = 0
        for(let item of surroundingCells){
          totalPride += item.pride
        }
        gridUtils.increasePride(newBox, totalPride/30)
        gridUtils.increaseProsperity(newBox, -totalPride/60)
        gridUtils.increaseProsperity(newBox, (box.pride)/10)
      }
    }
    return newGrid
  }

  makePrideful(x: number, y: number){
    gridUtils.getCell(this.simulationGrid, x,y).pride = 100
  }
  
  test(){
    console.log(this.simulationGrid)
  }

  //make this available to the template
  getRgb(targetCell: gridUtils.cell){
    return gridUtils.getRgb(targetCell)
  }
}
