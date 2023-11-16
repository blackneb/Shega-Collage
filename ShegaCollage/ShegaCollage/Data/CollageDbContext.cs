using Microsoft.EntityFrameworkCore;
using ShegaCollage.Models;
namespace ShegaCollage.Data
{
    public class CollageDbContext: DbContext
    {
        public CollageDbContext(DbContextOptions<CollageDbContext> options) : base(options)
        {
            
        }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Grade> Grades { get; set; }
    }
}
