import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import {Observable} from 'rxjs';

interface Program {
  name: string;
  active: boolean;
}
@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  programs: Program[];
  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) {
    this.programs = [];
  }

  getPrograms(headers): Observable<Program[]> {
    return this.http.get<Program[]>(
      'http://localhost:8080/programs',
      { headers }
    );
  }

  async ngOnInit() {
    const accessToken = await this.oktaAuth.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + accessToken
    });
    this.getPrograms(headers)
    .subscribe(programs => this.programs = programs);
  }

}
