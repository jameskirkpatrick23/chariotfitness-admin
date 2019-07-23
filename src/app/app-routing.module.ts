import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProgramsComponent} from './programs/programs.component';
import {ProgramDetailComponent} from './program-detail/program-detail.component';
import {ExerciseDetailComponent} from './exercise-detail/exercise-detail.component';
import {RoutineFormComponent} from './routine-form/routine-form.component';
import {ExercisesComponent} from './exercises/exercises.component';
import {RoutineDetailComponent} from './routine-detail/routine-detail.component';
import {ExerciseFormComponent} from './exercise-form/exercise-form.component';
import {ProgramFormComponent} from './program-form/program-form.component';
import {UsersComponent} from './users/users.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {WorkoutLogsComponent} from './workout-logs/workout-logs.component';
import {WorkoutFormComponent} from './workout-form/workout-form.component';

const routes: Routes = [
  { path: '', component: ProgramsComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'programs/new', component: ProgramFormComponent },
  { path: 'programs/:id', component: ProgramDetailComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'users/:userId/programs/:programId/routines/:routineId/workouts', component: WorkoutLogsComponent },
  { path: 'users/:userId/programs/:programId/routines/:routineId/workouts/new', component: WorkoutFormComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'exercises/new', component: ExerciseFormComponent },
  { path: 'exercises/:id', component: ExerciseDetailComponent },
  { path: 'programs/:programId/routines/new', component: RoutineFormComponent },
  { path: 'programs/:programId/routines/:routineId', component: RoutineDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
