import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { Employeeservices } from '../../services/employeeservices';
import { Router } from '@angular/router';



@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit{
employees: Employee[] = [];
currentPage = 1;
  pageSize = 5; // number of rows per page
  
   constructor(private employeeService:Employeeservices,private router: Router) {}

  ngOnInit(): void {
   this.loadEmployees();
  }


  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }
  get paginatedEmployees(): Employee[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.employees.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.employees.length / this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

   deleteEmployee(id: number) {
    if (confirm('Are you sure?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees();
      });
    }
  }


addEmployee() {
  this.router.navigate(['/employee/add']);
}

editEmployee(id: number) {
  this.router.navigate(['/employee/edit', id]);
}

}
