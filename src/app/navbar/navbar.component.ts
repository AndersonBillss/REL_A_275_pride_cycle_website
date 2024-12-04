import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

interface navElement {
  page: string,
  element?: ElementRef
}

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
export class NavbarComponent implements /* OnInit */AfterViewInit {
  @ViewChild("underline") underlineRef?: ElementRef;

  @ViewChild("homeLink") homeLinkRef?: ElementRef;
  @ViewChild("simulationLink") simulationLinkRef?: ElementRef;
  
  public elements: navElement[] = []
  public selectedPage: string = "/home"

  public navAnimationTime: string = "0s"

  constructor(
    private _router: Router
  ){}    

  ngAfterViewInit(): void {
    //Set the elements to the loaded refs
    this.elements = [
      {
        page: "/",
        element: this.homeLinkRef
      },
      {
        page: "/simulation",
        element: this.simulationLinkRef
      },
    ]

    this._router.events.subscribe((e: any) => {
      //Run code whenever the user navigates
      if(e instanceof NavigationEnd){
        this.selectedPage = e.urlAfterRedirects
        setTimeout(() => {
          this.update()
        })
      }
    })
    

    //Wait to add the the animation time
    setTimeout(() => {
      this.navAnimationTime = ".3s"
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.navAnimationTime = "0s"
    this.update()
    setTimeout(() => {
      this.navAnimationTime = ".3s"
    });  
  }

  update(): void{
    if(window.innerWidth > 600){
      //Get the HTML elements
      const targetItem = this.elements.find(item => item.page === this.selectedPage)
      const targetElement: HTMLElement = targetItem?.element?.nativeElement
      const underline: HTMLElement = this.underlineRef?.nativeElement
      if(!targetElement || !underline){
        return
      }
  
      //Get the offset of the target nav-item
      const targetDisplacement = targetElement.offsetLeft
      const targetWidth = targetElement.offsetWidth
  
      //Set the offset of the underline element
      underline.style.marginLeft = `${targetDisplacement}px`
      underline.style.width = `${targetWidth}px`
    }
  }
}
