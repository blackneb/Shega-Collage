using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace ShegaCollage.Models
{
    public class Course
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CourseId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }

        [Required]
        [MaxLength(20)]
        public string CourseCode { get; set; }

        public string Description { get; set; }

        [Required]
        public int CreditHours { get; set; }

        public List<Enrollment> Enrollments { get; set; }
        public List<Grade> Grades { get; set; }
    }
}
