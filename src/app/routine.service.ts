import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import {Routine} from './models';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
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
    this.messageService.add(`Routine Service: ${message}`);
  }

  getRoutines(): Observable<Routine[]> {
    return this.http.get<Routine[]>(
      'http://localhost:3000/routines',
      this.httpOptions
    ).pipe(
      catchError(this.handleError<Routine[]>('getRoutines', []))
    );
  }

  updateRoutine(routine: Routine): Observable<Routine> {
    this.messageService.add('Routine Service: updating single routine');
    return this.http.put(
      `http://localhost:3000/routines/${routine.id}`,
      routine,
      this.httpOptions
    ).pipe(
        catchError(this.handleError<any>(`updateRoutine`))
      );
  }

  getRoutine(id): Observable<Routine> {
    return this.http.get<Routine>(
      `http://localhost:3000/routines/${id}`,
      this.httpOptions
    ).pipe(
      catchError(this.handleError<Routine>('getRoutine'))
    );
  }


  createRoutine(routine: Routine): Observable<Routine> {
    return this.http.post<Routine>(
      `http://localhost:3000/programs/${+routine.programId}/routines`,
      routine,
      this.httpOptions
    ).pipe(

      catchError(this.handleError<Routine>('createRoutine'))
    );
  }

}
