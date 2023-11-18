import { useState } from 'react';
import { Button, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import axios from 'axios';
import { notification } from 'antd';
import { URL } from '../constants/constants';



const StudentModal = ({handleClose, getData}:any) => {
  async function postData(posdata:any){
    try{
      const response = await axios.post(URL + "/student",posdata);
      notification.success({
        message: 'Student Added Successfully',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
      handleClose();
      getData();
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
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
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
        postData(formData)
        // You can send the form data to your backend or perform other actions
      };
  return (
    <div>
      <p className='font-bold text-xl text-gray-600'>Register Student</p>
      <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="firstName">First Name</InputLabel>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FormHelperText>Enter a valid email address</FormHelperText>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <FormHelperText>Enter a valid phone number</FormHelperText>
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

export default StudentModal