import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing-module';
import { EmployeeList } from '../components/employee-list/employee-list';
import { EmployeeForm } from '../components/employee-form/employee-form';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: EmployeeList },
  { path: 'add', component: EmployeeForm },
  { path: 'edit/:id', component: EmployeeForm }
];

@NgModule({
  declarations: [
    EmployeeList,
    EmployeeForm
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) ,
    FormsModule              // 👈 required for [(ngModel)]  // 👈 directly used here
  ]
})
export class EmployeeModule { }
