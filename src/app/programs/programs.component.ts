import {Component, OnInit} from '@angular/core';
import {Program} from '../models';
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
    this.programService.getPrograms()
      .subscribe(programs =>
        this.programs = programs);
  }

  ngOnInit() {
    this.getPrograms();
  }

}
