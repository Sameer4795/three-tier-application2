import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeList } from '../components/employee-list/employee-list';
import { EmployeeForm } from '../components/employee-form/employee-form';

const routes: Routes = [
  { path: '', component: EmployeeList },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
