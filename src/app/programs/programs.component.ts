import {Component, OnInit} from '@angular/core';
import {Program} from '../program';
import {ProgramService} from '../program.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  programs: Program[];
  displayedColumns: string[] = ['id', 'name', 'active'];

  constructor(private programService: ProgramService) {
  }

  getPrograms(): void {
    this.programService.getPrograms().then(observable =>
      observable.subscribe(programs =>
        this.programs = programs));
  }

  async ngOnInit() {
    this.getPrograms();
  }

}
