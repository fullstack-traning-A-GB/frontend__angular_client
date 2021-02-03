import {Injectable} from '@angular/core';
import {CoinRowDetailView} from '../model/dto/coin-row-detail-view';
import {RestBNCService} from './rest-bnc.service';
import {Observable, of} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConverterServiceService {

  coin: CoinRowDetailView;

  constructor(private restBNCService: RestBNCService) {
  }

  public makeChange(priceToConvert: number, symbol: string): Observable<number> {
    return this.restBNCService.makeChange(symbol).pipe(
      map(assetTickerResponse => assetTickerResponse),
      flatMap(valueToConvert => {
        console.log(`value to convert is ${valueToConvert}`);
        const result = (priceToConvert / valueToConvert) * 100;
        return of(result);
      })
    );
  }

  public getAvailableSymbols(): Observable<string[]> {
    return this.restBNCService.getToAsset('').pipe(
      map(response => {
        return response.content.map(o => o.symbol);
      })
    );
  }

}
