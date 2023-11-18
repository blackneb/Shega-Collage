import { useState } from 'react';
import { Button, FormControl, InputLabel, Input, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { URL } from '../constants/constants';


const EditGradeModal = ({ getData, handleCloseEdit, editedGrade}:any) => {
  async function postData(posdata:any){
    try{
      const response = await axios.put(URL + `/grade/${editedGrade.gid}`,posdata)
      getData();
      handleCloseEdit();
    }
    catch(error){
    }
  }
    const [formData, setFormData] = useState({
        studentId: editedGrade.sid,
        courseId: editedGrade.cid,
        academicPeriod: editedGrade.ap,
        letterGrade: editedGrade.lg,
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
        postData(formData);
      };
  return (
    <div>
      <p className='font-bold text-xl text-gray-600'>Edit Course</p>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="studentID">Student ID</InputLabel>
          <Input
            id="studentID"
            name="studentID"
            type="text"
            value={editedGrade.studentfullname}
            onChange={handleChange}
            required
            disabled
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="courseID">Course ID</InputLabel>
          <Input
            id="courseID"
            name="courseID"
            type="text"
            value={editedGrade.courset}
            onChange={handleChange}
            required
            disabled
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="academicPeriod">Academic Period</InputLabel>
          <Select
            id="academicPeriod"
            name="academicPeriod"
            value={editedGrade.ap}
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
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditGradeModal
