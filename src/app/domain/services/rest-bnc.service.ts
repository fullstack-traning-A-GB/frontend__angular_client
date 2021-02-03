import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {TokenRequestDTO} from '../model/dto/token-request-dto';
import {TokenResponseDTO} from '../model/dto/token-response-dto';
import {Resource} from '../model/constants/resource.enum';
import {AssetDetailsResponse} from '../model/dto/asset-details-response';
import {ContentWrapper} from '../model/dto/content-wrapper';
import {AssetTickerResponse} from '../model/dto/asset-ticker-response';
import {flatMap, map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestBNCService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.postToToken().subscribe(jwt => localStorage.setItem('token', jwt.access_token));
    console.log(`${localStorage.getItem('token')}`);
  }

  public postToToken(): Observable<TokenResponseDTO> {
    return this.httpClient.post<TokenResponseDTO>(`${Resource.BASE_URL}/${Resource.GET_TOKEN_RESOURCE}`, new TokenRequestDTO());
  }

  public getToAssetTicker(assetId: string): Observable<ContentWrapper<AssetTickerResponse>> {
    return this.httpClient.get<ContentWrapper<AssetTickerResponse>>(`${Resource.BASE_URL}/${Resource.ASSET_TICKER_RESOURCE}?assetId=${assetId}`);
  }

  public getToAsset(symbol: string): Observable<ContentWrapper<AssetDetailsResponse>> {
    let urlParams = new HttpParams();
    if (symbol) {
      urlParams = urlParams.append('symbol', symbol);
    }
    return this.httpClient.get<ContentWrapper<AssetDetailsResponse>>(`${Resource.BASE_URL}/${Resource.GET_ASSET}`,
      {params: urlParams});
  }

  public makeChange(symbol: string): Observable<number> {
    return this.getToAsset(symbol)
      .pipe(
        map(asset => {
          return asset.content[0].id;
        }),
        switchMap(assetId => {
          return this.getToAssetTicker(assetId);
        })
      )
      .pipe(
        flatMap(assetTicker => {
          if (assetTicker.content !== undefined) {
            console.log(`${JSON.stringify(assetTicker)}`);
            return of(assetTicker.content[0].price);
          }
          throw new Error('No value for that coin or maybe is not crypto');
        }));

  }
}
