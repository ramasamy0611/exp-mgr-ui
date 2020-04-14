import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {RegisterComponent} from './register/register.component';
import {TermsAndConditionsComponent} from './termsandconditions/terms-and-conditions.component';
import {DashboardComponent} from './dashboard/dashboard.component';


const routes: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: '#', component: TermsAndConditionsComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
