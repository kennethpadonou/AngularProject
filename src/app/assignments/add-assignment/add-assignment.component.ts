import { Component, OnInit, /*EventEmitter, Output,*/ Input } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
//import ../Assignment.model.ts;
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  //@Input() formVisible: boolean = true;
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();
  nouvelAssignment:Assignment | undefined;

  nomDevoir: string = '';
  dateDeRendu: Date | undefined;
  isChecked: boolean = false;
  ajoutActive: boolean = false;

  onSubmit($event: any) {
    $event.preventDefault();
    const newAssignment = new Assignment();
    //newAssignment.id = this.assignmentService.getNewId();
    newAssignment.id = Math.floor(Math.random() * 1000000) + 1;
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    if (this.isChecked) {
      newAssignment.rendu = true;
    }
    //this.assignments.push(newAssignment);

    //this.nouvelAssignment.emit(newAssignment);
    this.assignmentService
      .addAssignment(newAssignment)
      .subscribe((message) => {
        console.log(message)
        this.router.navigate(['/home'])
      });
    //this.formVisible = !this.formVisible;

    //On navifue vers la page d'accueil
    //this.router.navigate(['/home']);


  }

  checkBoxChanged(event: any) {
    // Vous pouvez accéder à l'état de la case à cocher via event.checked
    if (event.checked) {
      //this.assignments[0].rendu = true;
      this.isChecked = true;
      //console.log('La case à cocher a été cochée.');
    } else {
      //this.assignments[0].rendu = false;
      this.isChecked = false;
      //console.log('La case à cocher a été décochée.');
    }
  }

  constructor(
    private assignmentService: AssignmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
