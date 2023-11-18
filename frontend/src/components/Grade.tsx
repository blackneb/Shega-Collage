import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import GradeModal from '../modals/GradeModal';
import GradeTable from '../tables/GradeTable';
import {FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import EditGradeModal from '../modals/EditGradeModal';
import RemoveGradeModal from '../modals/RemoveGradeModal';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
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



const Grade = () => {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);
  const [coursesList, setCoursesList] = useState([])
  const [removedId, setRemovedId] = useState<number>()
  const [data,setData] = useState<any[]>([])
  const [editedGrade, setEditedGrade] = useState({})
  const [initialData, setInitialData] = useState<any[]>([])
  const [enrollmentData, setEnrollmentData] = useState<any[]>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  async function getData(){
    try{
      const response = await axios.get( URL + "/grade",{
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setData(response.data);
      setInitialData(response.data)
    }
    catch(error){
    }
  }

  const handleOpenEdit = (gradeid: number, studentid:number, courseid:number, studentfname:string, studentlname:string, coursetitle:string, academicPeriod:string, letterGrade:string) => {
    const edited = {
      gid: gradeid,
      sid:studentid,
      cid:courseid,
      studentfullname: studentfname + " " + studentlname,
      courset:coursetitle,
      ap:academicPeriod,
      lg:letterGrade
    }
    setEditedGrade(edited);
    setOpenEdit(true);
  }
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenRemove = (gradeId:number) =>{
    setRemovedId(gradeId);
    setOpenRemove(true);
  } 
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
    setData(initialData.filter((item:any) => item.course.title === value))
  };
  
  useEffect(() => {
    async function getCoursesList(){
      try{
        const response = await axios.get(URL + "/Course/GetAllCourseNames",{
          headers: {
            'Content-Type': 'application/json',
          },
        })
        setCoursesList(response.data)
      }
      catch(error){
      }
    }
    async function getDataEnrollment(){
      try{
        const response = await axios.get(URL + "/Enrollment",{
          headers: {
            'Content-Type': 'application/json',
          },
        })
        setEnrollmentData(response.data);
      }
      catch(error){
      }
    }
    getData()
    getCoursesList()
    getDataEnrollment()
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
            <GradeModal getData={getData} enrollmentData={enrollmentData}/>
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
            <EditGradeModal getData={getData} handleCloseEdit={handleCloseEdit} editedGrade={editedGrade}/>
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
            <RemoveGradeModal getData={getData} removedId={removedId} handleCloseRemove={handleCloseRemove}/>
          </Box>
        </Modal>
      </div>
      <div className="flex justify-center items-center mb-4">
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
              {
                coursesList.map((course:any) => (
                  <MenuItem key={course} value={course}>{course}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <div>
            <Button onClick={handleOpen} variant="contained" startIcon={<AddIcon/>} style={{ backgroundColor: '#4CAF50'}}>Add New Grade</Button>
          </div>
      </div>
      {
        data.length === 0? (
        <>
          <Loading/>
        </>
        ):(
        <>
        <div className=" mx-20">
          <GradeTable data = {data} handleOpen={handleOpen} handleOpenEdit={handleOpenEdit} handleOpenRemove={handleOpenRemove}/>
        </div>
        </>
        )
      }
    </div>
  )
}

export default Grade
