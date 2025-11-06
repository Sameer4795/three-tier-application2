import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeList } from './components/employee-list/employee-list';


const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeList },

  // 👇 Lazy load the employee routes
   {
     path: 'employee',
      loadChildren: () =>
      import('./employee/employee-module').then(m => m.EmployeeModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
