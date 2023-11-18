import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import CourseTable from "../tables/CourseTable";
import Modal from '@mui/material/Modal';
import CourseModal from '../modals/CourseModal';
import axios from 'axios';
import { URL } from '../constants/constants';
import Loading from './Loading';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  bgcolor: 'white',
  borderRadius: '10px',
  borderColor:'white',
  boxShadow: 24,
  p: 4,
};



const Course = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  async function getData(){
    try{
      const response = await axios.get(URL + "/course",{
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setData(response.data);
    }
    catch(error){
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="max-h-[calc(100vh-80px)] w-full">
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CourseModal handleClose={handleClose} getData={getData}/>
          </Box>
        </Modal>
      </div>
      <div className="flex justify-center m-4">
        <Button onClick={handleOpen} variant="contained" startIcon={<AddIcon/>} style={{ backgroundColor: '#4CAF50', marginTop:'5px' }}>Add New Course</Button>
      </div>
      {
        data.length === 0? (
        <>
          <Loading/>
        </>
        ):(
        <>
        <div className=" mx-20">
          <CourseTable data = {data}/>
        </div>
        </>
        )
      }
      
    </div>
  )
}

export default Course
