import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartjsComponent } from './shared/chartjs.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChartjsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chartjs3';
}
