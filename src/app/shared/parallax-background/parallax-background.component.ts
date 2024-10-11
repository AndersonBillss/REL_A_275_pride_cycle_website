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
  @Input() src!: string;
  @Input() height!: number;
  @Input() fadeTransitionSeconds: number = 0;
  @Input() factor: number = 2;

  opacity: string = "0%"
  prevWindowWidth: number = window.innerWidth
  imgCenterX: number = 0
  imgCenterY: number = 0

  ngAfterViewInit() {
    //get elements
    const img = this.parallaxImg.nativeElement
    const container = this.parallaxContainer.nativeElement
    container.style.height = `${this.height}px`    
    //add event listeners
    window.addEventListener('resize', () => this.handleWindowResize(img, container, false))
    document.addEventListener('scroll', () => this.parallaxScroll(img, container))
    //snap the image to the correct place
    this.handleWindowResize(img, container, true)
  }


  handleWindowResize(img: HTMLElement, container: HTMLElement, force: boolean){
    //prevent the image from resizing if address bar comes up on mobile devices
    if((this.prevWindowWidth != window.innerWidth) || force){
      const imgHeightToWidth = img.offsetHeight / img.offsetWidth
      const containerHeightRequired = container.offsetHeight / 2 + window.innerHeight / 2
      const imgRequiredHeightToWidthRatio = containerHeightRequired / container.offsetWidth

      if(imgHeightToWidth > imgRequiredHeightToWidthRatio){
        //if the image is taller than required
        this.imgCenterY = (img.offsetHeight - containerHeightRequired) / 2
        this.imgCenterX = 0
        img.style.height = 'auto'
        img.style.width = `${container.offsetWidth}px`
      } else {
        //if the image is wider than required
        this.imgCenterY = 0
        this.imgCenterX = (img.offsetWidth - container.offsetWidth) / 2
        img.style.height = `${containerHeightRequired}px`
        img.style.width = 'auto'
      }
      //appropriately set the image to the correct positionn
      this.parallaxScroll(img, container)
    }
    this.prevWindowWidth = window.innerWidth
  }

  parallaxScroll(img: HTMLElement, container: HTMLElement){
    requestAnimationFrame(() => {
      const scrollY = window.scrollY
      const containerTop = container.offsetTop
      const translation = scrollY/this.factor - containerTop/this.factor
      img.style.transform = `translate(-${this.imgCenterX}px, ${translation - this.imgCenterY}px)`
    });
  }

  //the image only appears after it loads so that you can't see it snapping into place
  imgLoad(img: HTMLElement, container: HTMLElement){
    this.handleWindowResize(img, container, true)
    this.opacity = "100%"
  }
}
