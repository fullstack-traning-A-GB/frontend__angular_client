import {Injectable} from '@angular/core';
import {RestBNCService} from './rest-bnc.service';
import {TokenRequestDTO} from '../model/dto/token-request-dto';

@Injectable({
  providedIn: 'root'
})
export class TokenBNCService {
  token?: string;
  constructor(private restService: RestBNCService) {
    this.restService.postToToken(new TokenRequestDTO()).subscribe(jwt => localStorage.setItem('token', jwt.access_token));
    this.token = localStorage.getItem('token');
  }
}
