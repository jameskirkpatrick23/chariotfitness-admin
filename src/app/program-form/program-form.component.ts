import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ProgramService} from '../program.service';
import {Program} from '../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.css']
})
export class ProgramFormComponent implements OnInit {
  programForm: FormGroup;

  constructor(private location: Location,
              private fb: FormBuilder,
              private programService: ProgramService) { }

  ngOnInit() {
    const newForm = this.fb.group({
      name: ['', [Validators.required]],
    });
    this.programForm = newForm;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.programService.createProgram({...this.programForm.value} as Program)
      .subscribe(program => this.location.back());
  }
}
