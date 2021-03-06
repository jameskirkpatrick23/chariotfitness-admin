import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Program} from './models';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
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
    this.messageService.add(`Program Service: ${message}`);
  }

  getPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(
      'http://localhost:3000/programs',
      this.httpOptions
    ).pipe(
      catchError(this.handleError<Program[]>('getPrograms', []))
    );
  }

  updateProgram(program: Program): Observable<Program> {
    const url = `api/programs/${program.id}`;
    this.messageService.add('Program Service: updating single program');
    return this.http.put(url, program, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>(`updateProgram`))
      );
  }

  getProgram(id): Observable<Program> {
    return this.http.get<Program>(
      `http://localhost:3000/programs/${id}?_embed=routines`,
      this.httpOptions
    ).pipe(
      catchError(this.handleError<Program>('getProgram'))
    );
  }

  createProgram(program: Program): Observable<Program> {
    return this.http.post<Program>(
      `http://localhost:3000/programs`,
      program,
      this.httpOptions
    ).pipe(
      catchError(this.handleError<Program>('createProgram'))
    );
  }

}
