import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RoutineService} from '../routine.service';
import {Routine} from '../models';

@Component({
  selector: 'app-routine-detail',
  templateUrl: './routine-detail.component.html',
  styleUrls: ['./routine-detail.component.css']
})
export class RoutineDetailComponent implements OnInit {
  @Input() selectedRoutine: Routine;
  isEditing = false;
  displayedColumns: string[] = ['id', 'name'];

  constructor(
    private route: ActivatedRoute,
    private routineService: RoutineService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.getRoutine();
  }

  setEdit(): void {
    this.isEditing = true;
  }

  save(): void {
    this.routineService.updateRoutine(this.selectedRoutine)
      .subscribe(() => { this.isEditing = false; });
  }

  goBack(): void {
    this.location.back();
  }

  getRoutine(): void {
    const id = +this.route.snapshot.paramMap.get('routineId');
    this.routineService.getRoutine(id)
      .subscribe(routine => this.selectedRoutine = routine);
  }

}
