import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {


  titre: String = 'Mon application Angular sur les assignments';
  // ajoutActive: boolean = false;
  //nomDevoir: string = '';
  //dateDeRendu: Date | undefined;
  //isChecked: boolean = false;

  //assignmentSelectionne: Assignment | undefined;
  //formVisible = false;
  assignments: Assignment[] = [];
  constructor(private assignmentsService: AssignmentsService,
    private authService: AuthService) {}


  ngOnInit(): void {
    this.getAssignments();
    //this.assignmentsService.getAssignments()
    //this.assignments = this.assignmentsService.getAssignments();
  }
  isAdmin(): boolean {
    return this.authService.Admin;
  }
  /*
  onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }
  */

  /*
  onNouvelAssignment(event: Assignment) {
    //this.assignments.push(event);
    this.assignmentsService
      .addAssignment(event)
      .subscribe((message) => console.log(message));


  }
  */


  getAssignments() {
    this.assignmentsService
      .getAssignments()
      .subscribe((assignments) => (this.assignments = assignments));
  }

  onAssignmentSupprime(assignment: Assignment) {
    this.assignmentsService
      .deleteAssignment(assignment)
      .subscribe((message) => console.log(message));
  }


  // assignmentClique(assignment: Assignment) {
  //   this.assignmentSelectionne = assignment;
  // }
}
