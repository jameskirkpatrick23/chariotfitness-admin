import { Component, OnInit } from '@angular/core';
import {Exercise} from '../models';
import {ExerciseService} from '../exercise.service';
@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  exercises: Exercise[];
  displayedColumns: string[] = ['id', 'name', 'mainMuscle', 'secondaryMuscle'];

  constructor(private exerciseService: ExerciseService) {
  }

  getExercises(): void {
    this.exerciseService.getExercises()
      .subscribe(exercises =>
        this.exercises = exercises);
  }

  ngOnInit() {
    this.getExercises();
  }

}
