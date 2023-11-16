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
    public class EnrollmentController : ControllerBase
    {
        public readonly CollageDbContext _context;
        public readonly IMapper _mapper;
        public EnrollmentController( CollageDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EnrollmentDto>>> GetEnrollment()
        {
            if(_context.Enrollments == null)
            {
                return NotFound();
            }
            var enrollments = await _context.Enrollments.ToListAsync();
            var enrollmentdtos = _mapper.Map<IEnumerable<EnrollmentDto>>(enrollments);
            return Ok(enrollmentdtos);
        }
        [HttpPost]
        public async Task<ActionResult<Enrollment>> PostEnrollment(EnrollmentDto enrollmentDto)
        {
            try
            {
                var enrollment = _mapper.Map<Enrollment>(enrollmentDto);
                _context.Enrollments.Add(enrollment);
                await _context.SaveChangesAsync();
                return Ok(enrollment);
            }
            catch(DbUpdateException ex)
            {
                return StatusCode(500);
            }
        }
    }
}
