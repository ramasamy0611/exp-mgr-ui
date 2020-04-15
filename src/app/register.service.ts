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
        this.url = 'http://localhost:1111/expmgr/user/user/add';
    }

    addUser(user: User): Observable<User> {
        return this.httpClient.post<User>(this.url, user, this.httpOption);
        /* .pipe(
             catchError(this.handleError('addUser', user))
         );
     ;*/
    }

}
