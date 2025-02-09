import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';
import {HTTP_OPTIONS, HTTP_OPTIONS_POST} from './header.config';
import { SignUp } from './singUp';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    url: string;
    httpOption = HTTP_OPTIONS;
    httpOptionsPost = HTTP_OPTIONS_POST;

    constructor(private httpClient: HttpClient) {
        this.url = 'http://localhost:1111/expmgr';
    }
    signUpUser(signUpData: SignUp): Observable<SignUp> {
        return this.httpClient.post<SignUp>(this.url.concat('/userAdmin/signUp'), JSON.stringify(signUpData), this.httpOptionsPost)
            .pipe();
    }
    addUser(user: User): Observable<User> {
        return this.httpClient.post<User>(this.url.concat('/user/add'), JSON.stringify(user), this.httpOptionsPost)
            .pipe();
    }

    pingServer(): Observable<string> {
        // @ts-ignore
        return this.httpClient.get<string>(this.url.concat('/health/ping/pong'), {responseType: 'text'})
            .pipe();
    }

}
