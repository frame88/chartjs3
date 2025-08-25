import { ChangeDetectionStrategy, Component, effect, ElementRef, input, signal, viewChild, untracked } from '@angular/core';
import { Chart } from 'chart.js/auto';

export type ChartType = 'bar' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'line'

@Component({
  selector: 'app-chartjs',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <canvas #myChart></canvas>
  `,
  styles: ``
})
export class ChartjsComponent {

  canvas = viewChild<ElementRef<HTMLCanvasElement>>('myChart')
  data = input<number[] | null>([])
  labels = input<string[] | null>([])
  type = input<ChartType>('line')

  chart: Chart | null = null;

  constructor() {
    effect(() => {
      if (this.chart) {
        this.animate()
      } else {
        this.init(this.labels() || [], this.data() || [], this.type())
      }
    });

    effect(() => {
      const labels = untracked(this.labels) || []
      const data = untracked(this.data) || []
      const type = this.type()
      this.chart?.destroy()
      this.init(labels, data, type)
    });
  }

  animate() {
    if (this.chart) {
      this.chart.data.labels = this.labels() || []
      this.chart.data.datasets[0].data = this.data() || []
      this.chart.update()
    }
  }

  init(labels: string[] , data: number[], type: ChartType) {
    this.chart = new Chart(this.canvas()?.nativeElement!, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: '# of Votes',
          data: data,
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
