import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from './user';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080/api/register';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`Authentication Service: ${message}`);
  }

  loginUser(email: string, password: string): Observable<User> {
    this.messageService.add('Authentication service: logging in user');

    return this.http.post<User>(this.apiUrl, {email, password}, this.httpOptions)
      .pipe(
        tap(_ => {console.log(`logging in user with credentials: ${email}`)}),
        catchError(this.handleError<any>(`loginUser`))
      );
  }

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

}
