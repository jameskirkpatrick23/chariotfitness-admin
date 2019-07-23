import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../user.service';
import {Program, User, Routine} from '../models';
import {ProgramService} from '../program.service';
import {RoutineService} from '../routine.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() selectedUser: User;
  // isEditing = false;
  programs: Program[];
  routines: Routine[];
  userPrograms = [];
  displayedColumns: string[] = ['id', 'name'];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private programService: ProgramService,
    private routineService: RoutineService
  ) {}

  ngOnInit() {
    this.getPrograms();
    this.getRoutines();
    this.getUser();
  }

  getPrograms(): void {
    this.programService.getPrograms()
      .subscribe(programs =>
        this.programs = programs);
  }
  getRoutines(): void {
    this.routineService.getRoutines()
      .subscribe(routines =>
        this.routines = routines);
  }

  // setEdit(): void {
  //   this.isEditing = true;
  // }
  //
  // save(): void {
  //   this.userService.updateUser(this.selectedUser)
  //     .subscribe(() => { this.isEditing = false; });
  // }

  goBack(): void {
    this.location.back();
  }

  findProgram(programId: string): {} {
    const program = this.programs.find(p => p.id === programId);
    const routines = this.findRoutines(programId);
    return {program, routines};
  }

  findRoutines(programId: string): Routine[] {
    return this.routines.filter(r => r.programId === programId);
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => {
        if (this.programs) {
          user.programIds.forEach(progId => this.userPrograms.push(this.findProgram(progId)));
          this.selectedUser = user;
        }
      });
  }

}
