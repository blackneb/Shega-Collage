using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShegaCollage.Data;
using ShegaCollage.Dto;
using ShegaCollage.Models;

namespace ShegaCollage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        public readonly CollageDbContext _context;
        public readonly IMapper _mapper;
        public CourseController( CollageDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourse()
        {
            if(_context.Courses == null)
            {
                return NotFound();
            }
            var courses = await _context.Courses.ToListAsync();
            var coursedtos = _mapper.Map<IEnumerable<CourseDto>>(courses);
            return Ok(coursedtos);
        }
        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse(CourseDto courseDto)
        {
            try
            {
                var course = _mapper.Map<Course>(courseDto);
                _context.Courses.Add(course);
                await _context.SaveChangesAsync();
                return Ok(course);
            }
            catch(DbUpdateException ex)
            {
                return StatusCode(500);
            }
        }
    }
}
