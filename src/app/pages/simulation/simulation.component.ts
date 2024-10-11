import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [
    MatSliderModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss'
})
export class SimulationComponent implements OnInit{
  public Prosperity_factor: number=0
  public pride_factor: number=0
  public Righteousness_factor: number=0
  public Suffering_factor: number=0
  public Humility_factor: number=0

  public rows = 15
  public columns = 15
  public grid: cell[][] = []

  factor_x = 255/this.columns
  factor_y = 255/this.rows
  ngOnInit(): void {
    //populate the grid
    for(let y=0; y<this.rows; y++){
      this.grid.push([])
      for(let x=0; x<this.rows; x++){x
        const red = 255 - 255*(((this.factor_x*x)/255) * ((this.factor_y*y)/255))
        const green = y*this.factor_y
        const blue = x*this.factor_x
        this.grid[y].push(new cell(red,green,blue))
      }
    }

  }
}

class cell{
  public red!: number
  public green!: number
  public blue!: number
  constructor(r: number,g: number,b: number){
    this.red=r
    this.green=g
    this.blue=b
  }
}