import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';


const CourseModal = () => {
    const [formData, setFormData] = useState({
        courseName: '',
        courseCode: '',
        description: '',
        creditHour: '',
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
        // You can send the form data to your backend or perform other actions
      };
      
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="courseName">Course Name</InputLabel>
            <Input
            id="courseName"
            name="courseName"
            type="text"
            value={formData.courseName}
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
            name="creditHour"
            type="number"
            value={formData.creditHour}
            onChange={handleChange}
            required
            />
            <FormHelperText>Enter the credit hour for the course</FormHelperText>
        </FormControl>

        <Button type="submit" variant="contained" style={{ backgroundColor: '#4CAF50'}}>
            Register Course
        </Button>
        </form>
    </div>
  )
}

export default CourseModal
