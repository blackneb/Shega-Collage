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
    public class StudentController : ControllerBase
    {
        private readonly CollageDbContext _context;
        private readonly IMapper _mapper;
        public StudentController(CollageDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentDto>>> GetStudent()
        {
            if(_context.Students == null)
            {
                return NotFound();
            }
            var students = await _context.Students.ToListAsync();
            var studentdtos = _mapper.Map<IEnumerable<StudentDto>>(students);
            return Ok(studentdtos);
        }
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(StudentDto studentDto)
        {
            try
            {
                var student = _mapper.Map<Student>(studentDto);
                _context.Students.Add(student);
                await _context.SaveChangesAsync();
                return Ok(student);
            }
            catch(DbUpdateException ex)
            {
                return StatusCode(500);
            }
        }
    }
}
