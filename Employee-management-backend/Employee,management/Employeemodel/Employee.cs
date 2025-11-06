using System.ComponentModel.DataAnnotations;

namespace Employeemanagement.Employeemodel
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public int DepartmentId { get; set; }

        public Departement Department { get; set; }

        public string PasswordHash { get; set; } 
    }
}
