namespace ShegaCollage.Dto
{
    public class CourseDto
    {
        public int CourseId { get; set; } = 0;
        public string Title {  get; set; } = string.Empty;
        public string CourseCode {  get; set; } = string.Empty; 
        public string Description {  get; set; } = string.Empty;
        public string CreditHours {  get; set; } = string.Empty;
    }
}
