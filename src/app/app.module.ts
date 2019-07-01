import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatAutocompleteModule, MatGridListModule, MatToolbarModule, MatSidenavModule, MatSelectModule
} from '@angular/material';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { RoutineFormComponent } from './routine-form/routine-form.component';
import { ExerciseTemplateComponent } from './exercise-template/exercise-template.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { RoutineDetailComponent } from './routine-detail/routine-detail.component';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { ProgramFormComponent } from './program-form/program-form.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ProgramsComponent,
    ProgramDetailComponent,
    RoutineFormComponent,
    ExerciseTemplateComponent,
    ExercisesComponent,
    ExerciseDetailComponent,
    RoutineDetailComponent,
    ExerciseFormComponent,
    ProgramFormComponent,
    UsersComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
