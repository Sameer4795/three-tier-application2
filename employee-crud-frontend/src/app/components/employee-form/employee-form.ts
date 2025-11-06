import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employeeservices } from '../../services/employeeservices';
import { Employee } from '../../models/employee';



@Component({
  selector: 'app-employee-form',
  standalone: false,
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm {

  employee: Employee = {
    name: '',
    email: '',
    departmentId: 0,
    password: '',
    confirmPassword: '',
    employeeId: 0,
  };
  departments: any[] = [];
  submitted = false;

  constructor(private employeeService: Employeeservices,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.employeeService.getEmployee(+id).subscribe(emp => {
          this.employee = emp;
        });
      }
    });
  }

  loadDepartments() {
    this.employeeService.getDepartments().subscribe((data) => {
      this.departments = data;
    });
  }

  saveEmployee(): void {
    if (!this.employee.employeeId) {
      this.employeeService.addEmployee(this.employee).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeService
        .updateEmployee(this.employee.employeeId, this.employee)
        .subscribe(() => {
          this.router.navigate(['/employees']);
        });
    }
  }
  onSubmit(form: any) {
    this.submitted = true;
    if (this.employee.password !== this.employee.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!this.employee.employeeId) {

    } else {
      this.employee.password = '';
      this.employee.confirmPassword = '';
    }
    if (form.valid) {
      this.saveEmployee();
    } else {
      console.log('Form is invalid!');
    }
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
} 
