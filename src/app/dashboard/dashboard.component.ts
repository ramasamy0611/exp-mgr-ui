import {Component, OnInit} from '@angular/core';
import { RestResponse } from '../restresponse';
import { SignIn } from '../signIn';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Expense Manager Dashboard';

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
