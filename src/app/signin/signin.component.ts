import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SignInService } from '../sign-in.service';
import { SignIn } from '../signIn';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({ templateUrl: 'signin.component.html' })
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  signInData: SignIn = { signInId: 0, userName: '', encryptionKey: '', password: '' };
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private signInService: SignInService
  ) {
    // // redirect to home if already logged in
    // this.router.navigate(['/']);
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      encryptionkey: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['/signin'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.signInForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    this.loading = true;
    this.signInData.userName = this.f.username.value;
    this.signInData.encryptionKey = this.f.encryptionkey.value;
    this.signInData.password = this.f.password.value;
    this.signInService.signIn(this.signInData)
      .toPromise()
      .then(
        data => {
          this.router.navigate(["/welcome"], { state: { signInInfo: data } });
        }).catch(error => {
          this.loading = false;
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