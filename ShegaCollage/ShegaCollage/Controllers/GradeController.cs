using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShegaCollage.Data;
using ShegaCollage.Dto;
using ShegaCollage.Models;

namespace ShegaCollage.Controllers
{
    [EnableCors("AllowAnyOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        public readonly CollageDbContext _context;
        public readonly IMapper _mapper;
        public GradeController( CollageDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GradeDetailsDto>>> GetGrades()
        {
            var grades = await _context.Grades
                .Include(g => g.Student)
                .Include(g => g.Course)
                .ToListAsync();

            if (grades == null || !grades.Any())
            {
                return NotFound(); // 404 Not Found if there are no grades
            }

            var gradeDetailsDtos = grades.Select(grade => new GradeDetailsDto
            {
                GradeId = grade.GradeId,
                Student = _mapper.Map<StudentDto>(grade.Student),
                Course = _mapper.Map<CourseDto>(grade.Course),
                AcademicPeriod = grade.AcademicPeriod,
                LetterGrade = grade.LetterGrade
            });

            return Ok(gradeDetailsDtos); // 200 OK with the details of all grades
        }
        [HttpPost]
        public async Task<ActionResult<Grade>> PostGrade(GradeDto gradeDto)
        {
            try
            {
                // Check if the student is enrolled in the specified course
                bool enrollmentExists = await _context.Enrollments
                    .AnyAsync(e => e.StudentId == gradeDto.StudentId && e.CourseId == gradeDto.CourseId);

                // Check if a grade already exists for the specified student and course
                bool gradeExists = await _context.Grades
                    .AnyAsync(g => g.StudentId == gradeDto.StudentId && g.CourseId == gradeDto.CourseId);

                if (!enrollmentExists)
                {
                    // Return a specific response message if the student is not enrolled in the course
                    return BadRequest("Student does not take this course.");
                }
                else if (gradeExists)
                {
                    // Return a specific response message if a grade already exists for the student and course
                    return BadRequest("Grade has already been created for this student and course.");
                }

                var grade = _mapper.Map<Grade>(gradeDto);
                _context.Grades.Add(grade);
                await _context.SaveChangesAsync();

                return Ok("Grade created successfully.");
            }
            catch (DbUpdateException ex)
            {
                // Handle other database update exceptions and return a 500 Internal Server Error
                return StatusCode(500, "An error occurred while saving the grade.");
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<GradeDto>> DeleteGrade(int id)
        {
            var grade = await _context.Grades.FindAsync(id);

            if (grade == null)
            {
                return NotFound();
            }

            _context.Grades.Remove(grade);
            await _context.SaveChangesAsync();

            var gradeDto = _mapper.Map<GradeDto>(grade);

            return Ok(new { message = "success" });
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<GradeDto>> UpdateGrade(int id, GradeDto updatedGradeDto)
        {
            var grade = await _context.Grades.FindAsync(id);

            if (grade == null)
            {
                return NotFound();
            }

            // Update only the letterGrade property
            grade.LetterGrade = updatedGradeDto.LetterGrade;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500);
            }

            var updatedGrade = _mapper.Map<GradeDto>(grade);

            return Ok(updatedGrade);
        }
        [HttpGet("course-summary")]
        public async Task<ActionResult<CourseSummaryDto>> GetCourseSummary()
        {
            try
            {
                // Get the list of courses
                var courses = await _context.Courses.ToListAsync();

                // Initialize lists to store course titles, passed student counts, and failed student counts
                var courseTitles = new List<string>();
                var passCounts = new List<int>();
                var failCounts = new List<int>();

                // Loop through each course to gather statistics
                foreach (var course in courses)
                {
                    // Get the number of passed students for the course
                    var passCount = await _context.Grades
                        .Where(g => g.CourseId == course.CourseId && (g.LetterGrade == "A" || g.LetterGrade == "B" || g.LetterGrade == "C"))
                        .CountAsync();

                    // Get the number of failed students for the course
                    var failCount = await _context.Grades
                        .Where(g => g.CourseId == course.CourseId && (g.LetterGrade == "D" || g.LetterGrade == "F"))
                        .CountAsync();

                    // Add course details to the lists
                    courseTitles.Add(course.Title);
                    passCounts.Add(passCount);
                    failCounts.Add(failCount);
                }

                // Create a DTO to hold the results
                var courseSummaryDto = new CourseSummaryDto
                {
                    CourseList = courseTitles,
                    PassList = passCounts,
                    FailList = failCounts
                };

                return Ok(courseSummaryDto);
            }
            catch (Exception ex)
            {
                // Handle exceptions and return a 500 Internal Server Error
                return StatusCode(500, "An error occurred while fetching course summary.");
            }
        }
    }
}
