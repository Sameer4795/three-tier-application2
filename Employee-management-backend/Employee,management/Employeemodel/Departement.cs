using System.ComponentModel.DataAnnotations;

namespace Employeemanagement.Employeemodel
{
    public class Departement
    {
        [Key]
        public int DepartmentId { get; set; }
        public string? DepartmentName { get; set; }

        public ICollection<Employee> Employees { get; set; }
    }
}
