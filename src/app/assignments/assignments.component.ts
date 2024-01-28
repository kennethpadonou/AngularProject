import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';





/**
 * @title Data table with sorting, pagination, and filtering.
 */
/*


  

/** Builds and returns a new User. */

export interface AssignmentInterface {
  /*id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: 'completed' | 'pending' | 'overdue';*/
  _id?: string|undefined;
  id:number | undefined;
  nom: string | undefined;
  dateDeRendu: Date | undefined;
  rendu: boolean | undefined;
  idMatiere: string | undefined;
  auteur: string | undefined;
  note: number | undefined;
  remarques: string | undefined;
}



interface Matiere {
  _id: string;
  nom: string;
}

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})

/*
@Component({
  selector: 'app-stepper-overview',
  templateUrl: './stepper-overview.component.html',
  styleUrls: ['./stepper-overview.component.css'],
})
export class StepperOverviewExample {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}
}
*/

export class AssignmentsComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu', 'idMatiere', 'auteur'];
  dataSource: MatTableDataSource<Assignment> = new MatTableDataSource<Assignment>();
  selection = new SelectionModel<AssignmentInterface>(true, []);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  page: number = 1;
  limit: number = 10;
  totalDocs !: number;
  totalPages !: number;
  nextPage !: number;
  prevPage !: number;
  hasPrevPage !: boolean;
  hasNextPage !: boolean;



  
  titre: String = 'Mon application Angular sur les assignments';
  assignments: Assignment[] = [];
  matiere: any;
  constructor(private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private router: Router) {
    
    }
    navigateToAssignment(id: number) {
      this.router.navigate(['/assignment', id]);
    }
    
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    
    /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: AssignmentInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id }`; //return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }



  ngOnInit(): void {
    
    //this.getAssignments();
    //this.assignmentsService.getAssignments()
    //this.assignments = this.assignmentsService.getAssignments();
    /*
    this.assignmentsService.getAssignmentsPaginated(this.page, this.limit).
    subscribe(
      data => {
        console.log(data);
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      console.log("donnée reçues");
      console.log("Après la récupération des données");
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // Set the paginator here
    this.dataSource.sort = this.sort; // Set the sort here
    });
    */
    forkJoin({
      assignmentsPaginated: this.assignmentsService.getAssignmentsPaginated(this.page, this.limit),
      matiere: this.assignmentsService.getMatiere()
    }).subscribe(({ assignmentsPaginated, matiere }) => {
      
    this.assignments = assignmentsPaginated.map((assignment: Assignment) => {
      const correspondingMatiere = matiere.find((m: Matiere) => m._id === assignment.idMatiere);
      return {
        ...assignment,
        idMatiere: correspondingMatiere ? correspondingMatiere._id : assignment.idMatiere,
        nomMatiere: correspondingMatiere ? correspondingMatiere.nom : null
      };
    });
    console.log(this.assignments);
    this.totalDocs = assignmentsPaginated.totalDocs;
    this.totalPages = assignmentsPaginated.totalPages;
    this.nextPage = assignmentsPaginated.nextPage;
    this.prevPage = assignmentsPaginated.prevPage;
    this.hasPrevPage = assignmentsPaginated.hasPrevPage;
    this.hasNextPage = assignmentsPaginated.hasNextPage;
  
    this.dataSource = new MatTableDataSource(this.assignments);
    this.dataSource.paginator = this.paginator; // Set the paginator here
    this.dataSource.sort = this.sort; // Set the sort here
  });

    this.getAssignments();
    console.log("Dans getAssignments - totalDocs : ", this.totalDocs);
  console.log("Dans getAssignments - totalPages : ", this.totalPages);
  console.log("Dans getAssignments - totalPages : ", this.assignments);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterByStatus(status: string) {
    if (status === 'all') {
      // reset the dataSource to its original state
      this.dataSource.data = this.assignments;
    } else {
      // filter the dataSource based on the status
      this.dataSource.data = this.assignments.filter(assignment => 
        (status === 'rendu' && assignment.rendu) || 
        (status === 'nonRendu' && !assignment.rendu)
      );
    }
  }

  
  isAdmin(): boolean {
    return this.authService.Admin;
  }
  isLogged(): boolean {
    return this.authService.loggedIn;
  }


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


  peuplerBD() {
    this.assignmentsService.peuplerBDavecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
   window.location.reload();
      })
  }
  supprimerTout() {
    this.assignmentsService.supprimerToutesLesDonnees().subscribe(
      () => {
        console.log("Toutes les données ont été supprimées");
        // Vous pouvez ajouter ici d'autres actions à effectuer après la suppression des données
      },
      err => {
        console.error("Une erreur s'est produite lors de la suppression des données : ", err);
      }
    );
  }
 


  goToFirstPage() {
    this.page = 1;
    this.getAssignments();
  }

  goToPrevPage() {
    if (this.page > 1) {
      this.page--;
      this.getAssignments();
    }
  }

  goToNextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getAssignments();
    }
  }

  goToLastPage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  handlePageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.getAssignments();
  }
}
