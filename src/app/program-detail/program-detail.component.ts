import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ProgramService} from '../program.service';
import {Exercise, Program} from '../models';
import {ExerciseService} from '../exercise.service';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css']
})
export class ProgramDetailComponent implements OnInit {
  @Input() selectedProgram: Program;
  isEditing = false;
  exercises: Exercise[];
  displayedColumns: string[] = ['id', 'name', 'description', 'muscles'];

  constructor(
    private route: ActivatedRoute,
    private programService: ProgramService,
    private location: Location,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit() {
    this.getExercises();
    this.getProgram();
  }

  getExercises(): void {
    this.exerciseService.getExercises()
      .subscribe(exercises =>
        this.exercises = exercises);
  }

  setEdit(): void {
    this.isEditing = true;
  }

  save(): void {
    this.programService.updateProgram(this.selectedProgram)
      .subscribe(() => { this.isEditing = false; });
  }

  goBack(): void {
    this.location.back();
  }

  onlyUnique(value, index, self): boolean {
    return self.indexOf(value) === index;
  }

  getMuscles(exerciseArray): string[] {
    return exerciseArray.map(ex => {
      const foundExercise = this.exercises.find(exer => exer.id === ex.exercise.id);
      if (foundExercise) {
        return [foundExercise.mainMuscle, foundExercise.secondaryMuscle];
      }
      return '';
    }).flat().filter(this.onlyUnique);
  }

  getProgram(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.programService.getProgram(id)
      .subscribe(program => this.selectedProgram = program);
  }

}
