import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { RegisterService, } from '../register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { User } from '../user';
import { SignIn } from '../signIn';
import { SignUp } from '../singUp';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    user: User = { id: 0, firstName: '', lastName: '', emailId: '', type: '', };
    signInData: SignIn = { signInId: 0, userName: '', encryptionKey: '', password: '' };
    signUpData: SignUp = { signIn: null, user: null };

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private registerService: RegisterService,
    ) {
        // redirect to home if already logged in
        this.router.navigate(['/']);
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            eMailId: ['', Validators.required, Validators.email],
            encryptionKey: ['', Validators.required],
            // type: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.user.firstName = this.f.username.value;
        this.user.lastName = this.f.lastName.value;
        this.user.emailId = this.f.email.value;
        // this.user.type = this.f.type.value;

        this.signInData.password = this.f.password.value;
        this.signInData.userName = this.f.username.value;
        this.signInData.encryptionKey = this.f.encryptionKey.value;

        this.signUpData.user = this.user;
        this.signUpData.signIn = this.signInData

        this.registerService.signUpUser(this.signUpData)
            .toPromise()
            .then(data => {
                this.router.navigate(['/signin']);
            }).catch(error => this.handleError(error));
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
