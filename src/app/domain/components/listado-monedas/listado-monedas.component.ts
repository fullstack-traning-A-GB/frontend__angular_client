import {Component, HostListener, OnInit} from '@angular/core';
import {AssetDetailsResponse} from '../../model/dto/asset-details-response';
import {RestBNCService} from '../../services/rest-bnc.service';
import {CoinRowDetailView} from '../../model/dto/coin-row-detail-view';
import {TokenBNCService} from '../../services/token-b-n-c.service';
import {Router} from '@angular/router';
import {ConverterServiceService} from '../../services/converter-service.service';
import {flatMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-listado-monedas',
  templateUrl: './listado-monedas.component.html',
  styleUrls: ['./listado-monedas.component.sass']
})
export class ListadoMonedasComponent implements OnInit {

  monedasView: CoinRowDetailView[] = [];
  initialPage = 20;

  constructor(private restBnc: RestBNCService,
              private bncToken: TokenBNCService,
              private router: Router,
              private converter: ConverterServiceService) {
  }

  ngOnInit(): void {
    this.onSuscribtions();
  }

  onSuscribtions(): void {
    this.restBnc.getToAsset('')
      .pipe(
        flatMap(contentWrapper => contentWrapper.content.slice(1, this.initialPage + 1)),
        map(assetDetails => {
          const coinView: CoinRowDetailView = {
            coinName: assetDetails.name,
            isCrypto: assetDetails.type === 'CRYPTO',
            coinAssetId: assetDetails.id,
            coinSymbol: assetDetails.symbol,
            coinPrice: 0,
          };
          return coinView;
        }),
        flatMap(coinView => this.getPrices(coinView))
      )
      .subscribe(data => this.monedasView.push(data));
  }

  convertir(coin: CoinRowDetailView): void {
    this.converter.coin = coin;
    this.router.navigate(['conversor']);
  }

  getPrices(coin: CoinRowDetailView): Observable<CoinRowDetailView> {
    return this.restBnc.getToAssetTicker(coin.coinAssetId)
      .pipe(
        map(ticker => {
          if (Object.keys(ticker).length >= 1) {
            coin.coinPrice = ticker.content[0].price;
            return coin;
          }
          coin.coinPrice = 0;
          console.log(`${JSON.stringify(coin)}`);
          return coin;
        })
      );
  }

  onScroll(): void {
    this.initialPage = this.initialPage + 20;
    this.onSuscribtions();
  }


}
