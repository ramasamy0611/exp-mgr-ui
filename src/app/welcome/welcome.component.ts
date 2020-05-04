import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestResponse } from '../restresponse';
import { SignIn } from '../signIn';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  signInResponse: RestResponse;
  userName: string = '';
  signIn: SignIn;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.signInResponse = history.state["signInInfo"];
    this.signIn = this.signInResponse.responsePayLoad;
    this.userName = this.signIn.userName.toUpperCase();
    console.log(this.userName);
  }
}
