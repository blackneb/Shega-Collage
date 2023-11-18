namespace ShegaCollage.Dto
{
    public class GradeDetailsDto
    {
        public int GradeId { get; set; }
        public StudentDto Student { get; set; }
        public CourseDto Course { get; set; }
        public string AcademicPeriod { get; set; }
        public string LetterGrade { get; set; }
    }
}
