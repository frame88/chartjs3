import { AfterViewInit, Component, effect, ElementRef, viewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chartjs',
  imports: [],
  template: `
    <canvas #myChart></canvas>
  `,
  styles: ``
})
export class ChartjsComponent {

  canvas = viewChild<ElementRef<HTMLCanvasElement>>('myChart');

  constructor() {
    effect(() => {  
      new Chart(this.canvas()!.nativeElement, {
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
    });
  }
}
