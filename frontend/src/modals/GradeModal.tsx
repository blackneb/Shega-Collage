import { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { notification } from 'antd'
import { URL } from '../constants/constants';

const GradeModal = ({getData, enrollmentData}:any) => {
  const [student, setStudent] = useState([])
  const [course, setCourse] = useState([])
  async function postData(posdata:any){
    try{
      const response = await axios.post(URL + "/grade",posdata)
      notification.success({
        message: "Grade Added Successfully",
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
      getData();
    }
    catch(error:any){
      notification.error({
        message: error.response.data,
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    }
  }
    const [formData, setFormData] = useState({
        studentId: '',
        courseId: '',
        academicPeriod: '',
        letterGrade: '',
      });
    
      const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (event: any) => {
        event.preventDefault();
        postData(formData)
      };
      useEffect(() => {
        async function getData(){
          try{
            const response = await axios.get(URL + "/student",{
              headers: {
                'Content-Type': 'application/json',
              },
            })
            setStudent(response.data);
          }
          catch(error){
          }
        }
        async function getDataCourse(){
          try{
            const response = await axios.get(URL + "/course",{
              headers: {
                'Content-Type': 'application/json',
              },
            })
            setCourse(response.data);
          }
          catch(error){
          }
        }
        getData()
        getDataCourse()
        
      }, [])
  return (
    <div>
      <p className='font-bold text-xl text-gray-600'>Add Grade</p>
      <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="academicPeriod">Student Name</InputLabel>
          <Select
            id="studentID"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
          >
            {
              student.map((item:any) => (
                <MenuItem key={item.enrollmentId} value={item.studentId}>{item.firstName + " " + item.lastName}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="academicPeriod">Course Name</InputLabel>
          <Select
            id="studentID"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
          >
            {
              course.map((item:any) => (
                <MenuItem key={item.enrollmentId} value={item.courseId}>{item.title}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="academicPeriod">Academic Period</InputLabel>
          <Select
            id="academicPeriod"
            name="academicPeriod"
            value={formData.academicPeriod}
            onChange={handleChange}
            required
          >
            <MenuItem value="first quarter">First Quarter</MenuItem>
            <MenuItem value="second quarter">Second Quarter</MenuItem>
            <MenuItem value="third quarter">Third Quarter</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="letterGrade">Letter Grade</InputLabel>
          <Select
            id="letterGrade"
            name="letterGrade"
            value={formData.letterGrade}
            onChange={handleChange}
            required
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="D">D</MenuItem>
            <MenuItem value="F">F</MenuItem>
          </Select>
        </FormControl>

        <div className='w-full flex mt-4 justify-center'>
          <Button type="submit" variant="contained" style={{ backgroundColor: '#4CAF50' }}>
            Add
          </Button>
        </div>
      </form>
    </div>
  )
}

export default GradeModal
