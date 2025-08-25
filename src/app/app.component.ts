import { Component, signal } from '@angular/core';
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

  constructor() {
    this.loadLabels();
  }

  data = signal<number[] | null>([
    8, 7, 6, 6, 6, 7, 8, 10, 14, 18, 22, 24,
    26, 25, 24, 22, 20, 18, 16, 14, 12, 10, 9, 8
  ])
  labels = signal<string[] | null>([
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ] )

  loadLabels() {
    this.labels.set([
      '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
      '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
      '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
      '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
    ]);
    this.data.set(
      [
        8, 7, 6, 6, 6, 7, 8, 10, 14, 18, 22, 24,
        26, 25, 24, 22, 20, 18, 16, 14, 12, 10, 9, 8
      ]);
  }
  loadData1() {
    this.labels.set(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']);
    this.data.set([11, 12, 13, 18, 20, 22, 15])
  }
  loadData2() {
    this.labels.set(['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'])
    this.data.set([5, 7, 10, 15, 20, 25, 30, 28, 22, 15, 10, 6])
  }
}
