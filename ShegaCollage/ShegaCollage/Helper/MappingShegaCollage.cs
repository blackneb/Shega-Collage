using AutoMapper;

using ShegaCollage.Dto;
using ShegaCollage.Models;

namespace ShegaCollage.Helper
{
    public class MappingShegaCollage:Profile
    {
        public MappingShegaCollage()
        {
            CreateMap<Course, CourseDto>();
            CreateMap<Student, StudentDto>();
            CreateMap<Grade, GradeDto>();
            CreateMap<Enrollment, EnrollmentDto>();
            CreateMap<CourseDto, Course>();
            CreateMap<StudentDto, Student>();
            CreateMap<GradeDto, Grade>();
            CreateMap<EnrollmentDto, Enrollment>();
            CreateMap<EnrollmentDetailsDto, Enrollment>();
            CreateMap<Enrollment, EnrollmentDetailsDto>();
            CreateMap<GradeDetailsDto, Grade>();
            CreateMap<Grade, GradeDetailsDto>();
        }
    }
}
