import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RegisterService} from '../register.service';
import {User} from '../user';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    user: User = {firstName: '', emailId: '', password: '', lastName: ''};

    constructor(activatedRoute: ActivatedRoute, location: Location, private registerService: RegisterService) {
    }

    ngOnInit(): void {
    }


    onClick(user: User) {
        this.registerService.addUser(user)
            .subscribe({
                // tslint:disable-next-line:no-shadowed-variable
                next: user => console.info('user name added is', user.firstName),
                error: error => this.handleError(error)
            });
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}
