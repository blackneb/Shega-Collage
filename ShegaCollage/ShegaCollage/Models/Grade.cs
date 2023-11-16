using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ShegaCollage.Models
{
    public class Grade
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GradeId { get; set; }

        [Required]
        public int StudentId { get; set; }

        [Required]
        public int CourseId { get; set; }

        [Required]
        [MaxLength(20)]
        public string AcademicPeriod { get; set; }

        [Required]
        [MaxLength(2)]
        public string LetterGrade { get; set; }

        public Student Student { get; set; }
        public Course Course { get; set; }
    }
}
