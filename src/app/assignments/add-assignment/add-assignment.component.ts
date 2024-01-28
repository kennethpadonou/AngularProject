
import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { eleves } from '../../shared/eleves';

interface Eleve {
  id: number;
  nomComplet: string;
}

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  nomDevoir: string | undefined;
  dateDeRendu: Date | undefined;
  idMatiere: string | undefined;
  nomEleve: string | undefined;
  remarques: string | undefined;
  note: number | undefined;
  rendu: boolean = false;

  eleveData: Eleve[] = [];
  matieres: any[] = [];
  
  selectedMatiere: any;
  onMatiereChange(event: any) { // Remplacez 'any' par le type de l'événement
    this.selectedMatiere = event.value;
  }

  constructor(
    private assignmentService: AssignmentsService,
    private router: Router
  ) {this.eleveData = eleves;}

  ngOnInit(): void {
    this.getMatiere();
  }

  getMatiere() {
    this.assignmentService.getMatiere().subscribe((matieres) => {
      this.matieres = matieres;
    });
  }

  

  onSubmit(event: any) {
    event.preventDefault();
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 1000000) + 1;
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = this.rendu//false;
    newAssignment.idMatiere = this.selectedMatiere._id;
    newAssignment.auteur = this.nomEleve;
    newAssignment.remarques = this.remarques;
    newAssignment.note = this.note;

    this.assignmentService
      .addAssignment(newAssignment)
      .subscribe((message) => {
        console.log(message)
        this.router.navigate(['/home'])
      });
  }
}


//import { Component, OnInit, /*EventEmitter, Output,*/ Input } from '@angular/core';
/*
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
//import ../Assignment.model.ts;
import { eleves } from '../../shared/eleves';


interface Eleve {
  id: number;
  nomComplet: string;
}


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


  onSubmit($event: any) {
    $event.preventDefault();
    const newAssignment = new Assignment();
    //newAssignment.id = this.assignmentService.getNewId();
    newAssignment.id = Math.floor(Math.random() * 1000000) + 1;
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.idMatiere = this.selectedMatiere._id;
    newAssignment.auteur = this.nomEleve;
    newAssignment.remarques = this.remarques;
    newAssignment.note = this.note;

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
  ) {this.eleveData = eleves;}

  ngOnInit(): void {
    this.getMatiere();
  }
}
*/
