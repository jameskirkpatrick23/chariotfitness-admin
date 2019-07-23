import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators, Form} from '@angular/forms';
import {Routine, Workout, Exercise} from '../models';
import {ExerciseService} from '../exercise.service';
import {RoutineService} from '../routine.service';
import {WorkoutService} from '../workout.service';
import {ActivatedRoute} from '@angular/router';
import {Location, Time} from '@angular/common';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent implements OnInit {
  @Input() inputArray = [];
  programIdentifier: string;
  userIdentifier: string;
  exercises: Exercise[];
  routineIdentifier: string;
  workoutForm: FormGroup;
  currentRoutine: Routine;

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private routineService: RoutineService,
    private workoutService: WorkoutService,
    private location: Location
  ) { }

  ngOnInit() {
    this.programIdentifier = this.route.snapshot.paramMap.get('programId');
    this.userIdentifier = this.route.snapshot.paramMap.get('userId');
    this.routineIdentifier = this.route.snapshot.paramMap.get('routineId');
    this.getExercises();
    this.getRoutine(this.routineIdentifier)
      .subscribe(routine => {
        this.currentRoutine = routine;
        const newForm = this.fb.group({
          notes: ['', [Validators.maxLength(500)]],
          startedAt: [new Date(), [Validators.required]],
          exerciseResults: this.fb.array( [])
        });

        const arrayControl = newForm.controls.exerciseResults as FormArray;
        if (routine.exerciseArray) { this.inputArray = [...routine.exerciseArray]; }
        this.inputArray.forEach(item => {
          const newGroup = this.fb.group({
            exercise: [{id: item.exercise.id, name: item.exercise.name} || '', [Validators.required]],
            sets: [item.sets || 5],
            reps: [item.reps || '6, 5, 4-6, 6-8, 6-8'],
            weights: [''],
            type: [item.type || 'Reverse Pyramid Training'],
          });
          arrayControl.push(newGroup);
        });

        this.workoutForm = newForm;
      });

  }

  getRoutine(id: string): any {
    return this.routineService.getRoutine(id);
  }

  getExercises(): void {
    this.exerciseService.getExercises()
      .subscribe(exercises => {
        this.exercises = exercises;
      });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    const data = {...this.workoutForm.value};
    data.programId = this.programIdentifier;
    data.userId = this.userIdentifier;
    data.routineId = this.routineIdentifier;
    data.completedAt = new Date();

    this.workoutService.createWorkout(data as Workout)
      .subscribe(workout =>
        this.location.back()
      );
  }

}
