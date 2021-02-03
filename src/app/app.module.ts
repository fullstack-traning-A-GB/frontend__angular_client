import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ListadoMonedasComponent} from './domain/components/listado-monedas/listado-monedas.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RealizarCambioComponent} from './domain/components/realizar-cambio/realizar-cambio.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ClientInterceptor} from './domain/services/interceptor/client.interceptor';
import {JwtModule} from '@auth0/angular-jwt';


export function tokenGetter() {
  const token = localStorage.getItem('token');

  return token ? token : '';
}

@NgModule({
  declarations: [
    AppComponent,
    ListadoMonedasComponent,
    RealizarCambioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    InfiniteScrollModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['bravenewcoin.p.rapidapi.com'],
        disallowedRoutes: ['https://bravenewcoin.p.rapidapi.com/oauth/token', 'https://bravenewcoin.p.rapidapi.com/asset'],
      },
    }),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

