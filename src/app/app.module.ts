


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDrawer } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatToolbarRow } from '@angular/material/toolbar';
import { ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Assurez-vous d'importer le module FormsModule
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentsService } from './shared/assignments.service';
import  {RouterModule, Routes } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { LoginComponent } from './Log/login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

import {AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSelectModule } from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
//import { StepperOverviewExample } from './assignments/edit-assignment/stepper-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  //{ path: '', component: AssignmentsComponent },
  { 
    path: 'home', component: AssignmentsComponent, 
  //canActivate: [AuthGuard] 
  },
  { path: 'add', component: AddAssignmentComponent, canActivate: [AuthGuard] },
  {
    path: 'assignment/:id',
    component: AssignmentDetailComponent,
    //canActivate: [AuthGuard],
  },
  //{path: '', redirectTo: 'home', pathMatch: 'full'},
  //{path: '**', redirectTo: 'home'},
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [AuthGuard],
  },
  /*{ path: 'api/assignments', 
  component: AssignmentsComponent,
  canActivate: [AuthGuard] 
},*/
];
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    ToolbarComponent,
    SidenavComponent,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    //StepperOverviewExample,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CommonModule,
    MatCardModule,
    RouterModule.forRoot(routes),
    MatSlideToggleModule,
    MatMenuModule,HttpClientModule,
    MatPaginatorModule,MatTableModule,MatSortModule,MatSelectModule, MatTableModule,//MatPaginator,MatSort,MatTableDataSource
    MatStepperModule,ReactiveFormsModule,
  ],
  providers: [AssignmentsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
