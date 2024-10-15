import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { cell, grid } from '../../utils/grid';

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


  public simulationGrid: grid = new grid(50,50)


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

  calculateNextGrid(): grid{
    let newGrid: grid = this.simulationGrid
    for(let x=0; x<newGrid.width; x++){
      for(let y=0; y<newGrid.height; y++){
        const box = newGrid.getCell(x,y)
        const surroundingCells = newGrid.getSurroundingCells(x,y)
        let totalPride = 0
        for(let item of surroundingCells){
          totalPride += item.pride
        }
        box.increasePride(totalPride/30)
        box.increaseProsperity(-totalPride/60)
        box.increaseProsperity((box.pride)/10)
      }
    }
    return newGrid
  }

  makePrideful(x: number, y: number){
    this.simulationGrid.getCell(x,y).pride = 100
  }
  
  test(x: number,y: number){
    const targetCell: cell = this.simulationGrid.getCell(x,y)
    targetCell.increasePride(-100)
    const surrounding: cell[] = this.simulationGrid.getSurroundingCells(x,y)
    for(const item of surrounding){
      item.increasePride(100)
      item.increaseProsperity(100)
    }
  }
}
