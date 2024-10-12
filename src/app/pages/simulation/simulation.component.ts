import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [
    MatSliderModule,
    CommonModule,
    FormsModule,
    MatCardModule
  ],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss'
})
export class SimulationComponent implements OnInit{
  public Prosperity_factor: number=0
  public pride_factor: number=0

  public rows = 15
  public columns = 15
  public grid: cell[][] = []


  ngOnInit(): void {
    //populate the grid
    for(let y=0; y<this.rows; y++){
      this.grid.push([])
      for(let x=0; x<this.rows; x++){x
        this.grid[y].push(new cell(x*(100/15),y*(100/15)))
      }
    }

  }
}

class cell{
  getRed(){

    const redToBlue = this.pride/this.prosperity
    return 255 * redToBlue
  }
  getBlue(){
    const blueToRed = this.prosperity/this.pride
    return 255 * blueToRed
  }
  getGreen(){
    const red = this.getRed()
    const blue = this.getBlue()
    return 0
  }
  getRgb(){
    const redToBlue = this.pride/this.prosperity
    
    const r=255 * redToBlue
    const g=0
    const b=255 / redToBlue

    return `rgb(${r},${g},${b})`
  }

  public pride = 0
  public prosperity = 0

  constructor(pride: number=0, prosperity: number=0){
    this.pride = pride
    this.prosperity = prosperity
  }

}