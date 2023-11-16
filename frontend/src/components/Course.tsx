import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import CourseTable from "../tables/CourseTable";
import Modal from '@mui/material/Modal';
import CourseModal from '../modals/CourseModal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  borderRadius: '10px',
  borderColor:'white',
  boxShadow: 24,
  p: 4,
};

const Course = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
            <CourseModal/>
          </Box>
        </Modal>
      </div>
      <div className="flex justify-center m-4">
        <Button onClick={handleOpen} variant="contained" startIcon={<AddIcon/>} style={{ backgroundColor: '#4CAF50', marginTop:'5px' }}>Add New Course</Button>
      </div>
      <div className=" mx-20">
        <CourseTable/>
      </div>
    </div>
  )
}

export default Course
