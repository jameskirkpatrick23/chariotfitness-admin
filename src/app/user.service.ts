import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import {User} from './models';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
    this.messageService.add(`User Service: ${message}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      'http://localhost:3000/users',
      this.httpOptions
    ).pipe(
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  updateUser(user: User): Observable<User> {
    this.messageService.add('User Service: updating single user');
    return this.http.put(
      `http://localhost:3000/users/${user.id}`,
      user,
      this.httpOptions
    ).pipe(
      catchError(this.handleError<any>(`updateUser`))
    );
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(
      `http://localhost:3000/users/${id}`,
      this.httpOptions
    ).pipe(
      catchError(this.handleError<User>('getUser'))
    );
  }


  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      `http://localhost:3000/users`,
      user,
      this.httpOptions
    ).pipe(

      catchError(this.handleError<User>('createUser'))
    );
  }
}
