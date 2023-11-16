namespace ShegaCollage.Dto
{
    public class GradeDto
    {
        public int GradeId { get; set; } = 0;
        public int StudentId { get; set; } = 0;
        public int CourseId {  get; set; } = 0;
        public string AcademicPeriod {  get; set; } = string.Empty;
        public string LetterGrade {  get; set; } = string.Empty;
    }
}
