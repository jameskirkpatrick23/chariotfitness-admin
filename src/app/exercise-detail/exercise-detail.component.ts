import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ExerciseService} from '../exercise.service';
import {Exercise} from '../models';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {
  @Input() selectedExercise: Exercise;
  isEditing = false;
  displayedColumns: string[] = ['id', 'name'];

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.getExercise();
  }

  setEdit(): void {
    this.isEditing = true;
  }

  save(): void {
    this.exerciseService.updateExercise(this.selectedExercise)
      .subscribe(() => { this.isEditing = false; });
  }

  goBack(): void {
    this.location.back();
  }

  getExercise(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.exerciseService.getExercise(id)
      .subscribe(exercise => this.selectedExercise = exercise);
  }

}
