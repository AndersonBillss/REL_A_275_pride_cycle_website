import { Component } from '@angular/core';
import { ParallaxBackgroundComponent } from '../../shared/parallax-background/parallax-background.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ParallaxBackgroundComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
