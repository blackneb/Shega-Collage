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
        public async Task<ActionResult<IEnumerable<GradeDto>>> GetGrade()
        {
            if(_context.Grades == null)
            {
                return NotFound();
            }
            var grades = await _context.Grades.ToListAsync();
            var gradedtos = _mapper.Map<IEnumerable<GradeDto>>(grades);
            return Ok(gradedtos);
        }
        [HttpPost]
        public async Task<ActionResult<Grade>> PostGrade(GradeDto gradeDto)
        {
            try
            {
                var grade = _mapper.Map<Grade>(gradeDto);
                _context.Grades.Add(grade);
                await _context.SaveChangesAsync();
                return Ok(grade);
            }
            catch(DbUpdateException ex)
            {
                return StatusCode(500);
            }
        }
    }
}
