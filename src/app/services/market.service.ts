import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface EodBar {
  symbol: string;
  date: string;   // ISO
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
interface EodResponse {
  data: EodBar[];
}

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private http = inject(HttpClient);
  private base = 'https://api.marketstack.com/v1';

  getLatestEod(symbols: string[]) {
    const params = new HttpParams()
      .set('access_key', environment.marketstackKey)
      .set('symbols', symbols.join(','));
    return this.http.get<EodResponse>(`${this.base}/eod/latest`, { params });
  }

  getEodRange(symbol: string, from: string, to: string, limit = 100) {
    const params = new HttpParams()
      .set('access_key', environment.marketstackKey)
      .set('symbols', symbol)
      .set('date_from', from)
      .set('date_to', to)
      .set('limit', limit);
    return this.http.get<EodResponse>(`${this.base}/eod`, { params });
  }
}
