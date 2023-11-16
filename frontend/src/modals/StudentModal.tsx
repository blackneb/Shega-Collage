import { useState } from 'react';
import { Button, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';

const StudentModal = () => {
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
        console.log('Form Data:', formData);
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

      <Button type="submit" variant="contained" style={{ backgroundColor: '#4CAF50'}}>
        Register
      </Button>
    </form>
    </div>
  )
}

export default StudentModal
