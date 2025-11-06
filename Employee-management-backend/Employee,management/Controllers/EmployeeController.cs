using Employee_management.DTO;
using Employeemanagement.Data;
using Employeemanagement.DTO;
using Employeemanagement.Employeemodel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace Employeemanagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees()
        {
            return await _context.Employees
                .Include(e => e.Department) // include related department
                .Select(e => new EmployeeDto
                {
                    EmployeeId = e.EmployeeId,
                    Name = e.Name,
                    Email = e.Email,
                    DepartmentName = e.Department.DepartmentName 
                })
                .ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(int id)
        {
            var employee = await _context.Employees
                .Include(e => e.Department)
                .Where(e => e.EmployeeId == id)
                .Select(e => new EmployeeDto
                {
                    EmployeeId = e.EmployeeId,
                    Name = e.Name,
                    Email = e.Email,
                    DepartmentId = e.DepartmentId,
                    DepartmentName = e.Department.DepartmentName
                })
                .FirstOrDefaultAsync();

            if (employee == null) return NotFound();
            return employee;
        }


        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(EmployeeDto dto)
        {
            if (dto.Password != dto.ConfirmPassword)
            {
                return BadRequest("Passwords do not match.");
            }

            // Hash the password
            var passwordHasher = new PasswordHasher<Employee>();
            var employee = new Employee
            {
                Name = dto.Name,
                Email = dto.Email,
                DepartmentId = dto.DepartmentId

            };

            employee.PasswordHash = passwordHasher.HashPassword(employee, dto.Password);
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            dto.EmployeeId = employee.EmployeeId;
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.EmployeeId }, dto);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, EmployeeDto dto)
        {
            if (id != dto.EmployeeId) return BadRequest();

            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return NotFound();

            employee.Name = dto.Name;
            employee.Email = dto.Email;
            employee.DepartmentId = dto.DepartmentId;
            await _context.SaveChangesAsync();
            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return NotFound();

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return NoContent();
        }


        [HttpGet("departments")]
        public async Task<ActionResult<IEnumerable<DepartmentDto>>> GetDepartments()
        {
            var departments = await _context.Departments
                .Select(d => new DepartmentDto
                {
                    DepartmentId = d.DepartmentId,
                    DepartmentName = d.DepartmentName
                })
                .ToListAsync();

            return Ok(departments);
        }

        

    }
}
