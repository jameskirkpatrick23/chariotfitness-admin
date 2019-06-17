import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import {ProgramsComponent} from './programs/programs.component';
import {ProgramDetailComponent} from './program-detail/program-detail.component';
const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'programs/:id', component: ProgramDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
