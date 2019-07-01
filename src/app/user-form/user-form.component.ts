import {Component, OnInit} from '@angular/core';
import {Program, User} from '../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {ProgramService} from '../program.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  programOptions: Program[];

  constructor(private location: Location,
              private fb: FormBuilder,
              private programService: ProgramService,
              private userService: UserService) { }

  ngOnInit() {
    this.programService.getPrograms()
      .subscribe(programs => this.programOptions = programs);

    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      programIds: []
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.userService.createUser({...this.userForm.value} as User)
      .subscribe(user => this.location.back());
  }

}
