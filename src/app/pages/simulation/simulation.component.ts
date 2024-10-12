import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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

  public rows = 50
  public columns = 50
  public grid: cell[][] = []


  ngOnInit(): void {
    //populate the grid
    for(let y=0; y<this.rows; y++){
      this.grid.push([])
      for(let x=0; x<this.columns; x++){x
        this.grid[y].push(new cell((x+1)*(100/this.columns),(y+1)*(100/this.rows)))
      }
    }
  }

  togglePlay(){
    this.playing = !this.playing
    if(this.playing){
      this.simulate()
    }
  }


  simulate(){
    this.grid = this.calculateNextGrid()
    if(this.playing){
      setTimeout(() =>{
        requestAnimationFrame(() => this.simulate())
      }, 1000/this.speed)
    }
  }

  calculateNextGrid(): cell[][]{
    let newGrid: cell[][] = this.grid
    newGrid.forEach((row: cell[],x) => {
      row.forEach((box: cell,y) => {
        box.increasePride(5)
        box.increaseProsperity(5)
      })
    })
    return newGrid
  }
}

class cell{
  private prideMax = 100
  private prosperityMax = 100
  getRgb(){
    const prosperityFactor = (this.prosperity / this.prosperityMax)
    const prideMid = this.prideMax / 2

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
    if(this.pride < 0){
      this.pride = 0
    }
  }
  increaseProsperity(num: number=1){
    this.prosperity += num
    if(this.prosperity > this.prosperityMax){
      this.prosperity = this.prosperityMax
    }
    if(this.prosperity < 0){
      this.prosperity = 0
    }
  }

  public pride = 0
  public prosperity = 0

  constructor(pride: number=0, prosperity: number=0){
    this.pride = pride
    this.prosperity = prosperity
  }

}