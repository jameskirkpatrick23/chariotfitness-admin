import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProgramService} from '../program.service';
import {Program} from '../program';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css']
})
export class ProgramDetailComponent implements OnInit {
  selectedProgram: Program;
  constructor( private route: ActivatedRoute, private programService: ProgramService) {

  }

  ngOnInit() {
    this.getProgram();
  }

  getProgram(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.programService.getProgram(id).then(observable =>
      observable.subscribe(program => this.selectedProgram = program)
    );
  }

}
