import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {TokenRequestDTO} from '../model/dto/token-request-dto';
import {TokenResponseDTO} from '../model/dto/token-response-dto';
import {Resource} from '../model/constants/resource.enum';
import {AssetDetailsResponse} from '../model/dto/asset-details-response';
import {ContentWrapper} from '../model/dto/content-wrapper';
import {BncHeaders} from '../model/constants/bnc-headers.enum';
import {AssetTickerResponse} from '../model/dto/asset-ticker-response';
import {flatMap, map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestBNCService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set(BncHeaders.X_Rapid_API_Key, BncHeaders.RAPID_API_KEY_HEADER_VALUE)
      .set(BncHeaders.X_Rapid_API_Host, BncHeaders.RAPID_API_HOST_HEADER_VALUE)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('useQueryString', 'true');
  }

  public postToToken(tokenRequest: TokenRequestDTO): Observable<TokenResponseDTO> {
    return this.httpClient.post<TokenResponseDTO>(Resource.BASE_URL.concat(`/${Resource.GET_TOKEN_RESOURCE}`), tokenRequest,
      {headers: this.httpHeaders.set('Content-Type', 'application/json')});
  }

  public getToAssetTicker(assetId: string): Observable<ContentWrapper<AssetTickerResponse>> {
    return this.httpClient.get<ContentWrapper<AssetTickerResponse>>(`${Resource.BASE_URL}/${Resource.ASSET_TICKER_RESOURCE}?assetId=${assetId}`,
      {headers: this.httpHeaders});
  }

  public getToAsset(symbol: string): Observable<ContentWrapper<AssetDetailsResponse>> {
    let urlParams = new HttpParams();
    if (symbol) {
      urlParams = urlParams.append('symbol', symbol);
    }
    return this.httpClient.get<ContentWrapper<AssetDetailsResponse>>(`${Resource.BASE_URL}/${Resource.GET_ASSET}`,
      {headers: this.httpHeaders, params: urlParams});
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
