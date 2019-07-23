import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import {Routine} from '../models';
import {ExerciseService} from '../exercise.service';
import {ActivatedRoute} from '@angular/router';
import {RoutineService} from '../routine.service';
import {Location} from '@angular/common';

export interface ExerciseAutocompleteGroup {
  mainMuscle: string;
  exercises: {id: string, name: string}[];
}

@Component({
  selector: 'app-routine-form',
  templateUrl: './routine-form.component.html',
  styleUrls: ['./routine-form.component.css']
})

export class RoutineFormComponent implements OnInit {
  @Input() inputArray = [];
  @Input() selectedRoutine: Routine;
  programIdentifier: string;
  routineForm: FormGroup;
  formattedExercises: ExerciseAutocompleteGroup[];

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private routineService: RoutineService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.programIdentifier = this.route.snapshot.paramMap.get('programId');
    this.getExercises();

    const newForm = this.fb.group({
      name: [this.selectedRoutine.name || '', [Validators.required, Validators.maxLength(50)]],
      description: [this.selectedRoutine.description || '', [Validators.required, Validators.maxLength(500)]],
      exerciseArray: this.fb.array( [])
    });

    const arrayControl = newForm.controls.exerciseArray as FormArray;
    if (this.selectedRoutine.exerciseArray) { this.inputArray = [...this.selectedRoutine.exerciseArray]; }
    this.inputArray.forEach(item => {
      const newGroup = this.fb.group({
        exercise: [{id: item.exercise.id, name: item.exercise.name} || '', [Validators.required]],
        sets: [item.sets || 5, [Validators.minLength(1), Validators.maxLength(3)]],
        reps: [item.reps || '6, 5, 4-6, 6-8, 6-8', [Validators.minLength(1), Validators.maxLength(50)]],
        type: [item.type || 'Reverse Pyramid Training', [Validators.minLength(5), Validators.maxLength(50)]],
        notes: [item.notes || '', [Validators.maxLength(500)]]
      });
      arrayControl.push(newGroup);
    });

    this.routineForm = newForm;
  }

  formatExercisesForAutoSelect(exercises) {
    const exerciseArray: ExerciseAutocompleteGroup[] = [];
    exercises.forEach(exercise => {
      const found = exerciseArray.find(ea => ea.mainMuscle === exercise.mainMuscle);
      if (!found) {
        exerciseArray.push({
          mainMuscle: exercise.mainMuscle,
          exercises: [{id: exercise.id, name: exercise.name}]
        });
      } else {
        found.exercises.push({id: exercise.id, name: exercise.name});
      }
    });
    return exerciseArray;
  }

  getExercises(): void {
    this.exerciseService.getExercises()
      .subscribe(exercises => {
        this.formattedExercises = this.formatExercisesForAutoSelect(exercises);
      });
  }

  addInput(): void {
    const arrayControl = this.routineForm.controls.exerciseArray as FormArray;
    const newGroup = this.fb.group({
      exercise: ['', [Validators.required]],
      sets: ['5', [Validators.minLength(1), Validators.maxLength(20)]],
      reps: ['6,5,4-6,6-8,6-8', [Validators.minLength(1), Validators.maxLength(50)]],
      type: ['Reverse Pyramid Training', [Validators.minLength(5), Validators.maxLength(50)]],
      notes: ['', [Validators.maxLength(500)]]
    });
    arrayControl.push(newGroup);
  }

  goBack(): void {
    this.location.back();
  }

  delInput(index: number): void {
    const arrayControl = this.routineForm.controls.exerciseArray as FormArray;
    arrayControl.removeAt(index);
  }

  onSubmit(): void {
    const data = {...this.routineForm.value};
    data.programId = this.programIdentifier;
    if (this.selectedRoutine.name) {
      this.routineService.updateRoutine({id: +this.selectedRoutine.id, ...data} as Routine).subscribe(r => this.location.back());
    } else {
      this.routineService.createRoutine(data as Routine)
        .subscribe(routine =>
          this.location.back()
        );
    }
  }

}
