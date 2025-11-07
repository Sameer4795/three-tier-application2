-- Create Database
CREATE DATABASE Employee;
GO

-- Use the Database
USE Employee;
GO

-- Create Departments (Master Table)
CREATE TABLE Departments (
    DepartmentId INT PRIMARY KEY IDENTITY(1,1),
    DepartmentName NVARCHAR(MAX) NULL
);
GO

-- Create Employees (Child Table)
CREATE TABLE Employees (
    EmployeeId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(MAX) NOT NULL,
    Email NVARCHAR(MAX) NOT NULL,
    DepartmentId INT NOT NULL,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    FOREIGN KEY (DepartmentId) REFERENCES Departments(DepartmentId)
);
GO
