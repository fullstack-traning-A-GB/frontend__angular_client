import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BncHeaders} from '../../model/constants/bnc-headers.enum';

@Injectable()
export class ClientInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({headers: request.headers.set(BncHeaders.X_Rapid_API_Key, BncHeaders.RAPID_API_KEY_HEADER_VALUE)});
    request = request.clone({headers: request.headers.set(BncHeaders.X_Rapid_API_Host, BncHeaders.RAPID_API_HOST_HEADER_VALUE)});
    request = request.clone({headers: request.headers.set('useQueryString', 'true')});
    return next.handle(request);
  }
}
