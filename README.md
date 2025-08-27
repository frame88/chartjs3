# Chartjs3

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

E' stato generato un esercizio preso dal corso di fabio biondi, sui componenti dinamici. Questo include un componente grafico gestito tutto con i signale e al quale è possibile modificare il valore tipo (torta, line ecc.) e il range temporale, switchadno tra anno e mese.

In un branch successivo ho aggiunto un api per i mercati chiamata Marketstack
La documentazione di questa API è disponibile a questo [link](https://marketstack.com/documentation).

## Marketstack - /eod/latest

In particolare questo endpoint permette di ricevere gli ultimi dati disponibili della fine del giorno precedente, per uno o più simboli azionari.


```bash
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
    private base = 'https://api.marketstack.com/v1';

    this.http.get<EodResponse>(`${this.base}/eod/latest`, { params });

```



