import { Component, OnInit } from '@angular/core';
import { RestResponse } from '../restresponse';
import { SignIn } from '../signIn';
import { ActivatedRoute, Router } from '@angular/router';


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

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.signIn = history.state["signInInfo"];
    this.userName = this.signIn.userName.toUpperCase();
    console.log(this.userName);
  }
  
  goToExpense() {
    this.router.navigateByUrl('/expense');
  }
}
