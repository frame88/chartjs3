import { AfterViewInit, Component, effect, ElementRef, input, viewChild } from '@angular/core';
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

  canvas = viewChild<ElementRef<HTMLCanvasElement>>('myChart')
  data = input<number[] | null>([])
  labels = input<string[] | null>([])

  chart: Chart | null = null;

  constructor() {
    effect(() => {
      if (this.chart) {
        this.animate()
      } else {
        this.init()
      }
    });
  }

  animate() {
    if (this.chart) {
      this.chart.data.labels = this.labels() || []
      this.chart.data.datasets[0].data = this.data() || []
      this.chart.update()
    }
  }

  init() {
    this.chart = new Chart(this.canvas()?.nativeElement!, {
      type: 'line',
      data: {
        labels: this.labels() || [],
        datasets: [{
          label: '# of Votes',
          data: this.data() || [] ,
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
