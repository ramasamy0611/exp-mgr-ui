import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';
import {HTTP_OPTIONS} from './header.config';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    url: string;
    httpOption = HTTP_OPTIONS;

    constructor(private httpClient: HttpClient) {
        this.url = 'http://localhost:1111/expmgr/health/ping/pong';
    }

    addUser(user: User): Observable<string> {
        return this.httpClient.post<string>(this.url, user, this.httpOption);
        /* .pipe(
             catchError(this.handleError('addUser', user))
         );
     ;*/
    }

    pingServer(): Observable<any> {
        return this.httpClient.get<any>(this.url);
    }

}
