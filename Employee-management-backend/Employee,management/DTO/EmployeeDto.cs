using System.Text.Json.Serialization;

namespace Employeemanagement.DTO
{
    public class EmployeeDto
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public int DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
