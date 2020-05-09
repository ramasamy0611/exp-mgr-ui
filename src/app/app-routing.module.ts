import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './signin/signin.component';
import {RegisterComponent} from './register/register.component';
import {TermsAndConditionsComponent} from './termsandconditions/terms-and-conditions.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ExpenseComponent } from './expense/expense.component';


const routes: Routes = [
  {path: '', component: WelcomeComponent, pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
  {path: '#', component: TermsAndConditionsComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'expense', component: ExpenseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
