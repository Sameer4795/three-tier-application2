using Employeemanagement.Employeemodel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Employeemanagement.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Departement> Departments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Department)                
                .WithMany(d => d.Employees)             
                .HasForeignKey(e => e.DepartmentId);      
        }
    }
}
