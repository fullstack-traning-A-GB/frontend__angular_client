import {Component, OnInit} from '@angular/core';
import {CoinRowDetailView} from '../../model/dto/coin-row-detail-view';
import symbols from '../../mockdata/symbols.json';
import {ConverterServiceService} from '../../services/converter-service.service';

@Component({
  selector: 'app-realizar-cambio',
  templateUrl: './realizar-cambio.component.html',
  styleUrls: ['./realizar-cambio.component.sass']
})
export class RealizarCambioComponent implements OnInit {

  coinToConvert!: CoinRowDetailView;
  fromCoinSelected: string;
  fromCoin: string[] = symbols;
  toCoin: string[];
  toCoinSelected = 'BTC';
  resultValue: number;

  constructor(private converterService: ConverterServiceService) {
    this.coinToConvert = converterService?.coin;
    this.fromCoinSelected = this.coinToConvert?.coinSymbol;
    converterService.getAvailableSymbols().subscribe(availableSymbols => this.toCoin = availableSymbols);
  }

  ngOnInit(): void {
  }

  realizarCambio(): void {
    this.converterService
      .makeChange(this.coinToConvert?.coinPrice || 0, this.toCoinSelected)
      .subscribe(data => this.resultValue = data);
  }

  fromCurrency(coinChanged: string): void {
    this.fromCoinSelected = coinChanged;
  }

  toCurrency(coinChanged: string): void {
    this.toCoinSelected = coinChanged;
  }

}
