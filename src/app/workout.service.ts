import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import {Workout} from './models';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`Workout Service: ${message}`);
  }

  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(
      'http://localhost:3000/workouts',
      this.httpOptions
    ).pipe(
      catchError(this.handleError<Workout[]>('getWorkouts', []))
    );
  }

  updateWorkout(workout: Workout): Observable<Workout> {
    this.messageService.add('Workout Service: updating single workout');
    return this.http.put(
      `http://localhost:3000/workouts/${workout.id}`,
      workout,
      this.httpOptions
    ).pipe(
      catchError(this.handleError<any>(`updateWorkout`))
    );
  }

  getWorkout(id): Observable<Workout> {
    return this.http.get<Workout>(
      `http://localhost:3000/workouts/${id}`,
      this.httpOptions
    ).pipe(
      catchError(this.handleError<Workout>('getWorkout'))
    );
  }


  createWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(
      `http://localhost:3000/users/${workout.userId}/workouts`,
      workout,
      this.httpOptions
    ).pipe(

      catchError(this.handleError<Workout>('createWorkout'))
    );
  }

}
