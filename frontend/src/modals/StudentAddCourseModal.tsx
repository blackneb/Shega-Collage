import React, { useEffect, useState } from 'react'
import { Button,Select, MenuItem, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import axios from 'axios'
import { notification } from 'antd'
import { URL } from '../constants/constants';

const StudentAddCourseModal = ({studentId, handleCloseAdd}:any) => {
    const [data, setData] = useState([]);
    const [courseList, setCoursesList] = useState([]);
    async function postAddCourse(postdata:any){
        try{
            const response = await axios.post(URL + "/Enrollment", postdata)
            notification.success({
                message: "Course added successfully",
                duration: 5,
                onClose: () => {
                  console.log('Notification closed');
                },
              });
            handleCloseAdd()
        }
        catch (error:any){
            notification.warning({
                message: error.response.data,
                duration: 5,
                onClose: () => {
                  console.log('Notification closed');
                },
              });
        }
    }
    const [formData, setFormData] = useState({
        studentId: studentId,
        courseId: '',
      });
      const handleChange = (event:any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleSubmit = (event:any) => {
        event.preventDefault();
        // Add your form submission logic here
        console.log('Form Data:', formData);
        postAddCourse(formData);
        // You can send the form data to your backend or perform other actions
      };
    useEffect(() => {
        async function getstudent(){
            try{
                const response = await axios.get(URL + `/Student/${studentId}`)
                setData(response.data);
                console.log(response.data)
            }
            catch(error){
                console.log(error);
            }
        }
        async function getCoursesList(){
            try{
              const response = await axios.get(URL + "/Course",{
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              setCoursesList(response.data)
              console.log(response.data)
            }
            catch(error){
              console.log(error)
            }
          }
        getstudent();
        getCoursesList();
    }, [])
  return (
    <div>
      <p className='font-bold text-xl text-gray-600'>Register Student</p>
      <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="firstName">First Name</InputLabel>
        <Input
          id="studentId"
          name="studentId"
          type="text"
          value={data?.firstName + " " + data?.lastName}
          onChange={handleChange}
          required
          disabled
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="academicPeriod">Course Name</InputLabel>
          <Select
            id="courseId"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
          >
            {
              courseList.map((item:any,index) => (
                <MenuItem key={index} value={item.courseId}>{item.title}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      <div className='w-full flex mt-4 justify-center'>
        <Button type="submit" variant="contained" style={{ backgroundColor: '#4CAF50'}}>
          Add
        </Button>
      </div>
    </form>
    </div>
  )
}

export default StudentAddCourseModal
