namespace ShegaCollage.Dto
{
    public class EnrollmentDetailsDto
    {
        public int EnrollmentId { get; set; }
        // Include other enrollment properties

        public CourseDto Course { get; set; }
        public StudentDto Student { get; set; }
    }
}
