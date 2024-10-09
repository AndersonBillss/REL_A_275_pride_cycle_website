import { Routes } from '@angular/router';
import { SimulationComponent } from './pages/simulation/simulation.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "simulation", component: SimulationComponent},
    {path: "about", component: AboutComponent}
];
