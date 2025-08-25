import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chartjs',
  imports: [],
  template: `
    <canvas id="myChart"></canvas>
  `,
  styles: ``
})
export class ChartjsComponent implements AfterViewInit{

  constructor() {
  }
  
  ngAfterViewInit(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
