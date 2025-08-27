import { ChangeDetectionStrategy, Component, effect, ElementRef, input, signal, viewChild, untracked, OnInit, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { MarketService } from '../services/market.service';
import { DatePipe } from '@angular/common';

export type ChartType = 'bar' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'line'

@Component({
  selector: 'app-chartjs',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="w-full h-[70dvh]" style="overflow: hidden">
    <canvas #myChart></canvas>
    <ul class="flex bg-primary text-white gap-10">
      @for (r of rows(); track r.symbol) {
        <li>
          <h1 class="font-black text-6xl">{{ r.symbol }}</h1>
          close: {{ r.close }} <br>
          open: {{ r.open}} - <br>
          high: {{ r.high}} - <br>
          low: {{ r.low}} - <br>
          close: {{ r.close}} - <br>
          date: {{ r.date | date:'yyyy-MM-dd HH:mm'}} - <br>
        </li>
      }      
    </ul>
  </div>
  `,
  styles: ``
})
export class ChartjsComponent implements OnInit {

  // valori del corso
  canvas = viewChild<ElementRef<HTMLCanvasElement>>('myChart')
  data = input<number[] | null>([])
  labels = input<string[] | null>([])
  type = input<ChartType>('line')

  // valori market
  private api = inject(MarketService);
  rows   = signal<any[]>([]);
  loading = signal(false);
  error   = signal<string| null>(null);

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

  ngOnInit(): void {
    this.api.getLatestEod(['AAPL', 'MSFT']).subscribe({
      next: res => this.rows.set(res.data ?? []),
      error: err => this.error.set(err?.message ?? String(err)),
      complete: () => this.loading.set(false),
    });
    console.log('rows:', this.rows);
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
