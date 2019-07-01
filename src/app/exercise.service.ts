import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Exercise} from './models';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
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
    this.messageService.add(`Exercise Service: ${message}`);
  }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(
      'http://localhost:3000/exercises',
      this.httpOptions
    ).pipe(
      catchError(this.handleError<Exercise[]>('getExercises', []))
    );
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    const url = `http://localhost:3000/exercises/${exercise.id}`;
    this.messageService.add('Exercise Service: updating single exercise');
    return this.http.put(url, exercise, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>(`updateExercise`))
      );
  }

  getExercise(id): Observable<Exercise> {
    return this.http.get<Exercise>(
      `http://localhost:3000/exercises/${id}`,
      this.httpOptions
    ).pipe(
      catchError(this.handleError<Exercise>('getExercise'))
    );
  }
  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(
      `http://localhost:3000/exercises`,
      exercise,
      this.httpOptions
    ).pipe(
      catchError(this.handleError<Exercise>('createExercise'))
    );
  }

}
