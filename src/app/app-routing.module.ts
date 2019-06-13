import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import {ProgramsComponent} from './programs/programs.component';
const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: 'programs', component: ProgramsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
