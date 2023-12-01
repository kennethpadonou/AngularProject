import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { data500 } from './data';
import { forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignment[] = [];
  private HttpOptions = { 
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
  };

  constructor(private loggingService: LoggingService,
              private http:HttpClient) {}
    url = 'http://localhost:8010/api/assignments'
  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url)
    //return of(this.assignments);
    //getAssignments(): Assignment[] {
    //return this.assignments;
  }

  getNewId(): number {
    return this.assignments.length + 1;
  }
  addAssignment(assignment: Assignment): Observable<any> {
   /* this.assignments.push(assignment);
    if (assignment.nom !== undefined) {
      this.loggingService.log(assignment.nom, 'ajouté');
    }
    return of('Assignment ajouté');
    */
   return this.http.post(this.url, assignment, this.HttpOptions);
  }
/*
  data500.forEach((assignment) => {
    assignment.dateDeRendu = new Date(assignment.dateDeRendu);
    assignment.id = Number(assignment.id);
    observables.push(this.addAssignment(assignment));
  });
  */
  /* Je veux peupler la BD avec les assignments du tableau assignments de mon export data500 */
  /*
  peuplerBD_(): Observable<any>[] {
    let observables: Observable<any>[] = [];
    // data500.forEach((assignment) => {
    //   observables.push(this.addAssignment(assignment));
    // });
    data500.forEach((assignment) => {
      assignment.dateDeRendu = new Date(assignment.dateDeRendu);
      observables.push(this.addAssignment(assignment));
    });
    return observables;
  }
peuplerBD() {
  const observables = this.assignmentsService.peuplerBD();
forkJoin(observables).subscribe((responses) => {
  console.log('Toutes les données ont été ajoutées à la base de données');
})
}
*/
  deleteAssignment(assignment: Assignment): Observable<any> {
   /* const index = this.assignments.indexOf(assignment);

    if (index > -1) {
      this.assignments.splice(index, 1);
    }
    if (assignment.nom !== undefined) {
      this.loggingService.log(assignment.nom, 'supprimé');
    }
    return of('Assignment supprimé');
    */
    return this.http.delete(this.url+"/"+assignment._id);
  }

  getAssignment(id: number): Observable<Assignment | null> {
    /*const assignment = this.assignments.find((a) => {
      return a.id === id;
    });
    if (assignment) {
      return of(assignment);
    } else {
      return of(null);
    }
    */
    return this.http.get<Assignment>(this.url+"/"+id)
    .pipe(map(a => {
      a.nom+= "transformé avec un pipe...";
      return a;
    }),
    tap(_ => {
      console.log("tap: assignment avec id = "+id+" requête GET envoyée sur MongoDB cloud");
    }),
    catchError(this.handleError<Assignment>('getAssignment id=${id}'))
    );
  }
  private handleError<T>(operation: string, result?: T)  {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log('${operation} a échoué: ${error.message}');
      return of(result as T);
    }
  }
  
  /*handleError<T>(arg0: string): any {
    throw new Error('Method not implemented.');
  }*/
  updateAssignment(assignment: Assignment): Observable<any> {
    /*this.assignments.forEach((a, index) => {
      if (a === assignment) {
        //a.rendu = !a.rendu;
        this.assignments[index] = assignment; // On remplace l'assignment par le nouvel assignment
        //this.assignments[index] = a;
      }
    });
    if (assignment.nom !== undefined) {
      this.loggingService.log(assignment.nom, 'modifié');
    }
    return of('Assignment modifié');
    */
    return this.http.put(this.url, assignment);
  }
  
  
}
