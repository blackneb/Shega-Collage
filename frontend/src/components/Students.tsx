import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import StudentsTable from "../tables/StudentsTable";
import StudentModal from '../modals/StudentModal';

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

const Students = () => {
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
            <StudentModal/>
          </Box>
        </Modal>
      </div>
      <div className="flex justify-center m-4">
        <Button onClick={handleOpen} variant="contained" startIcon={<AddIcon/>} style={{ backgroundColor: '#4CAF50', marginTop:'5px' }}>Add New Student</Button>
      </div>
      <div className=" mx-20">
        <StudentsTable/>
      </div>
    </div>
  )
}

export default Students
