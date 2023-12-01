import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment | undefined;
  nom: string | undefined;
  dateDeRendu: Date | undefined;
  constructor(
    private assignmentService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //const id = this.route.snapshot.params['id'];
    //this.assignmentService.getAssignment(id);
    this.getAssignment();

    const nom = this.route.snapshot.queryParams['nom'];
    const fragment = this.route.snapshot.fragment;

    console.log("Query Params :");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment :");
    console.log(this.route.snapshot.fragment);
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];

    this.assignmentService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;
      // Pour pré-remplir le formulaire
      this.nom = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
    });
  }

  onSaveAssignment(event: any) {
    event.preventDefault();
    if (this.nom && this.assignment) {
      this.assignment.nom = this.nom;
    }
    if (this.dateDeRendu && this.assignment) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }

    if (this.assignment) {
      this.assignmentService
        .updateAssignment(this.assignment)
        .subscribe((message) => {
          console.log(message)
          this.router.navigate(['/home']);
        });
    }
    //redirection vers la page d'accueil
    //this.router.navigate(['/home']);
  }
}
