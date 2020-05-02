import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SignInService } from '../sign-in.service';
import { SignIn } from '../signIn';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  url: string;
  signInData: SignIn = { userName: '', password: '', encryptionKey: '' };

  constructor(httpClient: HttpClient, activatedRoute: ActivatedRoute, location: Location, private signInService: SignInService) {
  }

  ngOnInit(): void {
  }
  signIn(signInData: SignIn) {
    this.signInService.signIn(signInData)
      .toPromise()
      .then(answer => console.info('Received from server', JSON.stringify(answer)))
      .catch(error => this.handleError(error));
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
