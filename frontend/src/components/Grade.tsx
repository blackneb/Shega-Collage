import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import GradeModal from '../modals/GradeModal';
import GradeTable from '../tables/GradeTable';
import {FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditGradeModal from '../modals/EditGradeModal';
import RemoveGradeModal from '../modals/RemoveGradeModal';


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



const Grade = () => {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenRemove = () => setOpenRemove(true);
  const handleCloseRemove = () => setOpenRemove(false);

  const [formData, setFormData] = useState({
    courseName: '',
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(value);
  };
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
            <GradeModal/>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditGradeModal/>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={openRemove}
          onClose={handleCloseRemove}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <RemoveGradeModal/>
          </Box>
        </Modal>
      </div>
      <div className="flex justify-center mb-4">
        <FormControl margin="normal" sx={{ m: 1, minWidth: 180 }}>
            <InputLabel htmlFor="letterGrade">Course Name</InputLabel>
            <Select
              id="letterGrade"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              size='small'
              required
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
              <MenuItem value="E">E</MenuItem>
              <MenuItem value="F">F</MenuItem>
            </Select>
          </FormControl>
      </div>
      <div className=" mx-20">
        <GradeTable handleopen={handleOpen} handleOpenEdit={handleOpenEdit} handleOpenRemove={handleOpenRemove} />
      </div>
    </div>
  )
}

export default Grade
