import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OktaAuthService} from '@okta/okta-angular';
import {Observable} from 'rxjs';
import {Program} from './program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  headers: HttpHeaders;
  constructor(
    private oktaAuth: OktaAuthService,
    private http: HttpClient
  ) {}

  async setHeaders() {
    await this.getHeaders().then(accessToken => {
      this.headers = new HttpHeaders({
        Authorization: 'Bearer ' + accessToken
      });
    });
  }

  async getHeaders() {
    return await this.oktaAuth.getAccessToken();
  }

  async getPrograms(): Promise<Observable<Program[]>> {
    await this.setHeaders();
    return await this.http.get<Program[]>(
      'http://localhost:8080/programs',
      { headers: this.headers }
    );
  }

  async getProgram(id): Promise<Observable<Program>> {
    await this.setHeaders();
    return await this.http.get<Program>(
      `http://localhost:8080/programs/${id}`,
      { headers: this.headers }
    );
  }

}
