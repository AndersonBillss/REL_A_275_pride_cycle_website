import { Component, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-parallax-background',
  standalone: true,
  imports: [],
  templateUrl: './parallax-background.component.html',
  styleUrl: './parallax-background.component.scss'
})
export class ParallaxBackgroundComponent {
  @ViewChild('parallaxImg') parallaxImg!: ElementRef;
  @ViewChild('parallaxContainer') parallaxContainer!: ElementRef;

  @Input() img!: string;

  prevWindowWidth: number = window.innerWidth
  imgCenterX: number = 0
  imgCenterY: number = 0

  ngAfterViewInit() {
    const img = this.parallaxImg.nativeElement
    const container = this.parallaxContainer.nativeElement
    
    window.addEventListener('resize', () => this.handleWindowResize(img, container, false))
    document.addEventListener('scroll', () => this.parallaxScroll(img, container))

    this.handleWindowResize(img, container, true)

  }


  handleWindowResize(img: HTMLElement, container: HTMLElement, force: boolean){
    if((this.prevWindowWidth != window.innerWidth) || force){
      const imgHeightToWidth = img.offsetHeight / img.offsetWidth
      
      const imgMinHeightRequired = container.offsetHeight / 2 + window.innerHeight / 2
      const imgRequiredWidthToHeightRatio = imgMinHeightRequired / container.offsetWidth

      if(imgHeightToWidth > imgRequiredWidthToHeightRatio){
        this.imgCenterY = (img.offsetHeight - imgMinHeightRequired) / 2
        this.imgCenterX = 0
        img.style.height = 'auto'
        img.style.width = `${container.offsetWidth}px`

      } else {
        this.imgCenterY = 0
        this.imgCenterX = (img.offsetWidth - container.offsetWidth) / 2
        img.style.height = `${imgMinHeightRequired}px`
        img.style.width = 'auto'

      }
      this.parallaxScroll(img, container)
    }
    this.prevWindowWidth = window.innerWidth
  }

  parallaxScroll(img: HTMLElement, container: HTMLElement){
    const scrollY = window.scrollY
    const containerTop = container.offsetTop
    const translation = scrollY/2 - containerTop/2
    img.style.transform = `translate(-${this.imgCenterX}px, ${translation - this.imgCenterY}px)`
  }
}
