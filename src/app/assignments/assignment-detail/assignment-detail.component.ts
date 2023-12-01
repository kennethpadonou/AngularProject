import { Component, OnInit,/* Input,*/ Output, EventEmitter } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  //@Input() assignmentTransmis: Assignment | undefined | null;
  assignmentTransmis: Assignment | undefined | null;
  @Output() assignmentSupprime = new EventEmitter<Assignment>();

  /*supprimerAssignment(event: Assignment) {
    Assignment.splice(event, 1);
    console.log('Supprimer assignment');
  }*/

  constructor(
    private assignmentService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //on récupère l'id de l'assignment dans l'url
    //attention l'url est composée de string on utilisera donc le + pour caster en number
    const id = +this.route.snapshot.params['id']; //Attention, le paramètre est de type string
    //const id = +this.route.snapshot.params.id;
    this.assignmentService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;
      this.assignmentService
        .updateAssignment(this.assignmentTransmis)
        .subscribe((message) => {
          console.log(message)
          this.router.navigate(['/home']);
        });
      //this.assignmentTransmis = null;
      //this.router.navigate(['/home']);
    }
  }

  supprimerAssignment() {
    // if (this.assignmentTransmis !== null) {
    //   this.assignmentSupprime.emit(this.assignmentTransmis);
    // }
    if (
      this.assignmentTransmis !== null &&
      this.assignmentTransmis !== undefined
    ) {
      this.assignmentService
        .deleteAssignment(this.assignmentTransmis)
        .subscribe((message) => {
          console.log(message)
          this.router.navigate(['/home']);});
    }
    console.log('Supprimer assignment');
    //this.assignmentTransmis = null;
    //this.router.navigate(['/home']);
  }

  onClickEdit() {
    if (this.assignmentTransmis) {
      //this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit']);
      this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit']),
        {
          queryParam: { nom: this.assignmentTransmis.nom },
          fragment: 'edition',
        };
    }
  }

  isLogged(): boolean {
    return this.authService.loggedIn;
  }
  isAdmin(): boolean {
    return this.authService.Admin;
  }
}
