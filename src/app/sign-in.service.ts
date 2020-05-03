import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignIn } from './signIn';
import { HTTP_OPTIONS_POST } from './header.config';
import { Observable } from 'rxjs';
import { SERVER_CONFIG } from './server.config';
import { RestResponse } from './restresponse';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  baseUrl: string;
  serverConfig = SERVER_CONFIG;
  httpOptionsPost = HTTP_OPTIONS_POST;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = this.serverConfig.backEndUrl.concat('/userAdmin');
    this.httpClient = httpClient;
  }

  signIn(singInData: SignIn): Observable<RestResponse> {
    return this.httpClient.post<RestResponse>(this.baseUrl.concat('/signIn'), JSON.stringify(singInData), this.httpOptionsPost);
  }

}
