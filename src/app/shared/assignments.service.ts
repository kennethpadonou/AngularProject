import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  
  
    
    constructor(private loggingService: LoggingService, private http: HttpClient) { }
    //url = 'http://localhost:8010/api/assignments'
    url = 'https://angular-m1-project-32e5d49aea0c.herokuapp.com/api/assignments'
    getAssignments(): Observable<Assignment[]> {
      return this.http.get<Assignment[]>(this.url)
    }
    //url2 = 'http://localhost:8010/api/matieres'
    url2 = 'https://angular-m1-project-32e5d49aea0c.herokuapp.com/api/matieres'
    getMatiere(): Observable<any> {
      return this.http.get<any>(this.url2);
    }
    url3 = 'https://angular-m1-project-32e5d49aea0c.herokuapp.com/api/utilisateurs'
    getUsers(): Observable<any> {
      return this.http.get<any>(this.url3);
    }

    
    getAssignmentsPaginated(page: number, limit: number): Observable<any> {
      return this.http.get<any>(this.url + '?page=' + page + '&limit=' + limit);
    }
    getNewId(): number {
      return this.assignments.length + 1;
    }
    addAssignment(assignment: Assignment): Observable<any> {
      return this.http.post(this.url, assignment, this.HttpOptions);
    }
    
    peuplerBDavecForkJoin(): Observable<any> {
      debugger;
      let appelsVersAddAssignment: Observable<any>[] = [];
      
      data500.forEach(a => {
        const nouvelAssignment = new Assignment();
        nouvelAssignment.id = a.id;
        nouvelAssignment.nom = a.nom;
        nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
        nouvelAssignment.rendu = a.rendu;
        
        appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
      });
      
      return forkJoin(appelsVersAddAssignment);
    }

    supprimerToutesLesDonnees(): Observable<any> {
      let appelsVersDeleteAssignment: Observable<any>[] = [];
    
      data500.forEach(a => {
        const assignmentASupprimer = new Assignment();
        assignmentASupprimer.nom = a.nom;
        assignmentASupprimer.dateDeRendu = new Date(a.dateDeRendu);
        assignmentASupprimer.rendu = a.rendu;
    
        appelsVersDeleteAssignment.push(this.deleteAssignment(assignmentASupprimer));
      });
    
      return forkJoin(appelsVersDeleteAssignment);
    }
    
    
    
    
    
    
    
    
    /*deleteAssignment(assignment: Assignment): Observable<any> {
      //return this.http.delete(this.url + "/" + assignment.id);
      //return this.http.delete(this.url, assignment);
      return this.http.delete(this.url + "/" + assignment.id);
    }
    */
    deleteAssignment(assignment: Assignment): Observable<any> {
      const options = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          }),
          body: { id: assignment.id },
      };
      return this.http.delete(this.url, options);
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
      return this.http.get<Assignment>(this.url + "/" + id)
      .pipe(map(a => {
        //a.nom += " (exposé)";
        return a;
      }),
      tap(_ => {
        console.log("tap: assignment avec id = " + id + " requête GET envoyée sur MongoDB cloud");
      }),
      catchError(this.handleError<Assignment>('getAssignment id=${id}'))
      );
    }

    getOneMatiere(id: number): Observable<any | null> {
      return this.http.get<any>(this.url2 + "/" + id)
    }

    private handleError<T>(operation: string, result?: T) {
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
      debugger
      console.log(assignment);
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
  