namespace Employee_management.DTO
{
    public class LoginResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public int? EmployeeId { get; set; }
        public string? Name { get; set; }
    }
}
