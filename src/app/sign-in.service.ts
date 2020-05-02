import{Injectable}from'@angular/core';
import {HttpClient }from '@angular/common/http'
import {SignIn}from './signIn';
import {HTTP_OPTIONS_POST}from './header.config';
import {Observable }from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class SignInService {
baseUrl: string;
httpOptionsPost = HTTP_OPTIONS_POST;
constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:1111/expmgr/userAdmin'
    this.httpClient = httpClient
  }

  signIn(singInData: SignIn): Observable<SignIn> {
    return this.httpClient.post<SignIn>(this.baseUrl.concat('/signIn'), JSON.stringify(singInData), this.httpOptionsPost);
  }

}
