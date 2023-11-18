import { useState } from 'react';
import { Button, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import axios from 'axios';
import { notification } from 'antd';
import { URL } from '../constants/constants';
const CourseModal = ({handleClose, getData}:any) => {
    async function postData(posdata:any){
      try{
        const response = await axios.post(URL + "/course",posdata)
        notification.success({
          message: 'Course Added Successfully',
          duration: 5,
          onClose: () => {
            console.log('Notification closed');
          },
        });
        getData()
        handleClose()
      }
      catch(error){
        notification.error({
          message: 'Please, Try again!',
          duration: 5,
          onClose: () => {
            console.log('Notification closed');
          },
        });
      }
    }
    const [formData, setFormData] = useState({
        title: '',
        courseCode: '',
        description: '',
        creditHours: '',
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
        postData(formData);
      };
      
  return (
    <div>
      <p className='font-bold text-xl text-gray-600'>Add New Course</p>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="courseName">Course Name</InputLabel>
            <Input
            id="courseName"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            />
        </FormControl>

        <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="courseCode">Course Code</InputLabel>
            <Input
            id="courseCode"
            name="courseCode"
            type="text"
            value={formData.courseCode}
            onChange={handleChange}
            required
            />
        </FormControl>

        <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            required
            />
        </FormControl>

        <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="creditHour">Credit Hour</InputLabel>
            <Input
            id="creditHour"
            name="creditHours"
            type="number"
            value={formData.creditHours}
            onChange={handleChange}
            required
            />
            <FormHelperText>Enter the credit hour for the course</FormHelperText>
        </FormControl>
        <div className='w-full flex mt-4 justify-center'>
          <Button type="submit" variant="contained" style={{ backgroundColor: '#4CAF50'}}>
              Register
          </Button>
        </div>
        </form>
    </div>
  )
}

export default CourseModal