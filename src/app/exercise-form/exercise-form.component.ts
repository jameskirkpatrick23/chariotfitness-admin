import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ExerciseService} from '../exercise.service';
import {Exercise} from '../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.css']
})
export class ExerciseFormComponent implements OnInit {
  exerciseForm: FormGroup;

  constructor(private location: Location,
              private fb: FormBuilder,
              private exerciseService: ExerciseService) { }

  ngOnInit() {
    const newForm = this.fb.group({
      name: ['', [Validators.required]],
      mainMuscle: ['', [Validators.required]],
      secondaryMuscle: ['']
    });
    this.exerciseForm = newForm;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.exerciseService.createExercise({...this.exerciseForm.value} as Exercise)
      .subscribe(exercise => this.location.back());
  }
}
