﻿using AutoMapper;
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
        public async Task<ActionResult<IEnumerable<EnrollmentDetailsDto>>> GetAllEnrollmentsDetails()
        {
            var enrollments = await _context.Enrollments
                .Include(e => e.Course)
                .Include(e => e.Student)
                .ToListAsync();

            if (enrollments == null || !enrollments.Any())
            {
                return NotFound();
            }

            var enrollmentDetailsDtos = _mapper.Map<IEnumerable<EnrollmentDetailsDto>>(enrollments);
            return Ok(enrollmentDetailsDtos);
        }
        [HttpPost]
        public async Task<ActionResult<Enrollment>> PostEnrollment(EnrollmentDto enrollmentDto)
        {
            try
            {
                // Check if the enrollment already exists for the specified student and course
                bool enrollmentExists = await _context.Enrollments
                    .AnyAsync(e => e.StudentId == enrollmentDto.StudentId && e.CourseId == enrollmentDto.CourseId);

                if (enrollmentExists)
                {
                    // Return a specific response message if the course is already taken by the student
                    return BadRequest("Course already taken by the student.");
                }

                // If the enrollment does not exist, proceed with adding a new enrollment
                var enrollment = _mapper.Map<Enrollment>(enrollmentDto);
                _context.Enrollments.Add(enrollment);
                await _context.SaveChangesAsync();
        
                // Return the created enrollment
                return Ok(enrollment);
            }
            catch (DbUpdateException ex)
            {
                // Handle other database update exceptions and return a 500 Internal Server Error
                return StatusCode(500);
            }
}
        [HttpGet("{enrollmentId}")]
        public async Task<ActionResult<EnrollmentDetailsDto>> GetEnrollmentById(int enrollmentId)
        {
            var enrollment = await _context.Enrollments
                .Include(e => e.Course)
                .Include(e => e.Student)
                .FirstOrDefaultAsync(e => e.EnrollmentId == enrollmentId);

            if (enrollment == null)
            {
                return NotFound(); // 404 Not Found if the enrollment with the specified ID is not found
            }

            var enrollmentDetailsDto = _mapper.Map<EnrollmentDetailsDto>(enrollment);
            return Ok(enrollmentDetailsDto); // 200 OK with the details of the enrollment
        }
        [HttpGet("ByStudent/{studentId}")]
        public async Task<ActionResult<IEnumerable<EnrollmentDetailsDto>>> GetEnrollmentsByStudentId(int studentId)
        {
            var enrollments = await _context.Enrollments
                .Include(e => e.Course)
                .Include(e => e.Student)
                .Where(e => e.StudentId == studentId)
                .ToListAsync();

            if (enrollments == null || !enrollments.Any())
            {
                return NotFound(); // 404 Not Found if no enrollments for the specified student ID
            }

            var enrollmentDetailsDtos = _mapper.Map<IEnumerable<EnrollmentDetailsDto>>(enrollments);
            return Ok(enrollmentDetailsDtos); // 200 OK with the details of the enrollments
        }

    }
}
