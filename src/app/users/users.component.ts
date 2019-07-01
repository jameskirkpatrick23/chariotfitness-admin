import {Component, OnInit} from '@angular/core';
import {Program, User} from '../models';
import {UserService} from '../user.service';
import {ProgramService} from '../program.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['id', 'name', 'email', 'programs'];
  programOptions: Program[];

  constructor(private userService: UserService,
              private programService: ProgramService) {
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users =>
        this.users = users);
  }

  getProgramsForUser(user: User): string[] {
    return user.programIds.map(progId =>
      this.programOptions.find(pro => pro.id === progId).name);
  }

  ngOnInit() {
    this.programService.getPrograms()
      .subscribe(programs => this.programOptions = programs);
    this.getUsers();
  }

}
