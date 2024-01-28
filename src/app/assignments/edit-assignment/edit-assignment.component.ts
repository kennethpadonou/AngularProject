import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { eleves } from '../../shared/eleves';
import { MatSelectModule } from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';


interface Eleve {
  id: number;
  nomComplet: string;
}

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment | undefined;
  nom: string | undefined;
  dateDeRendu: Date | undefined;
  idMatiere: string | undefined;
  nomEleve: string | undefined;
  remarques: string | undefined;
  note: number | undefined;

  eleveData: Eleve[] = [];
  matieres: any[] = [];
  
  selectedMatiere: any;
  onMatiereChange(event: any) { // Remplacez 'any' par le type de l'événement
    this.selectedMatiere = event.value;
  }


  constructor(
    private assignmentService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {this.eleveData = eleves;}

  ngOnInit(): void {
    //const id = this.route.snapshot.params['id'];
    //this.assignmentService.getAssignment(id);
    this.getAssignment();
   this.getMatiere(); //this.getOneMatiere();
    //this.eleveData = eleves;

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
      this.nom = this.assignment.nom;
      this.dateDeRendu = this.assignment.dateDeRendu;
      this.idMatiere = this.assignment.idMatiere;
      this.nomEleve = this.assignment.auteur;
      this.remarques = this.assignment.remarques;
      this.note = this.assignment.note;
      
      if (this.assignment && this.matieres) {
        this.selectedMatiere = this.matieres.find(matiere => matiere._id === this.assignment?.idMatiere);
      }

    });
  }


  getMatiere() {
    this.assignmentService.getMatiere().subscribe((matieres) => {
      this.matieres = matieres;
      //this.selectedMatiere = matieres
      if (this.assignment && this.matieres) {
        this.selectedMatiere = this.matieres.find(matiere => matiere._id === this.assignment?.idMatiere);
      }
    });
  }
  getOneMatiere() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentService.getOneMatiere(id).subscribe((matiere) => {
      if (!matiere) return;
      this.matieres = matiere;
      this.selectedMatiere = matiere
    });
  }


  onSaveAssignment(event: any) {
    debugger
    console.log(this.nomEleve) 
    event.preventDefault();
    if (this.nom && this.assignment) {
      this.assignment.nom = this.nom;
    }
    if (this.dateDeRendu && this.assignment) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    if (this.selectedMatiere && this.assignment) {
      this.assignment.idMatiere = this.selectedMatiere._id;
    }
    if (this.nomEleve && this.assignment) {
      this.assignment.auteur = this.nomEleve;
    }
    if (this.remarques && this.assignment) {
      this.assignment.remarques = this.remarques;
    }
    if (this.note && this.assignment) {
      this.assignment.note = this.note;
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
