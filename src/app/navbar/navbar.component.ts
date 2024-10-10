import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(
    private _router: Router
  ){}
  currentPage: string = ''
  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof(NavigationEnd)){
        this.currentPage = event.url.slice(1,event.url.length)
      }
    })
  }
}
