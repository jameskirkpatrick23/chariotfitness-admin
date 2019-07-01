import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {ExerciseAutocompleteGroup} from '../routine-form/routine-form.component';
import {map, startWith} from 'rxjs/operators';

// tslint:disable-next-line:variable-name
export const _filter = (opt: {id: string, name: string}[], value: any): {id: string, name: string}[] => {
  if (!value.name) {
    const filterValue = value.toLowerCase();
    return opt.filter(item => item.name.toLowerCase().includes(filterValue));
  }
  return value;
};

@Component({
  selector: 'app-exercise-template',
  templateUrl: './exercise-template.component.html',
  styleUrls: ['./exercise-template.component.css']
})
export class ExerciseTemplateComponent implements OnInit {
  @Input() myForm: FormGroup; // This component is passed a FormGroup from the base component template
  @Input() formattedExercises: ExerciseAutocompleteGroup[];
  formattedExerciseOptions: Observable<ExerciseAutocompleteGroup[]>;

  constructor() { }
  ngOnInit() {
    this.formattedExerciseOptions = this.myForm.get('exercise')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  showExerciseName(value?: {id: string, name: string}): string | undefined {
    return value ? value.name : undefined;
  }

  private _filterGroup(value: string): ExerciseAutocompleteGroup[] {
    if (value) {
      return this.formattedExercises
        .map(group => ({mainMuscle: group.mainMuscle, exercises: _filter(group.exercises, value)}))
        .filter(group => group.exercises.length > 0);
    }

    return this.formattedExercises;
  }
}
