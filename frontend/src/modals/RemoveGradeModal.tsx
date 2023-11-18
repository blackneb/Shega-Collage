import {Button} from '@mui/material'
import axios from 'axios'
import { notification } from 'antd'
import { URL } from '../constants/constants';

const RemoveGradeModal = ({ getData, removedId, handleCloseRemove}:any) => {
  async function deleteData(){
    try{
      const response = await axios.delete(URL + `/grade/${removedId}`)
      notification.success({
        message: "grade deleted successfully",
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
      getData();
    }
    catch(error:any){
      notification.error({
        message: "Please, try again!",
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    }
  }
  const handleYes = () => {
    deleteData();
    handleCloseRemove();
  }
  const handleNo = () => {
    handleCloseRemove()
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <p>Are You sure! Do you want to delete?</p>
      <div className='flex items-center justify-center'>
        <Button variant="contained" color="primary" size="small" style={{ margin: '5px', backgroundColor: 'Green', color: 'black' }} onClick={handleYes}>
          Yes
        </Button>
        <Button variant="contained" color="primary" size="small" style={{ margin: '5px', backgroundColor: 'Red', color:'white' }} onClick={handleNo}>
          No
        </Button>
      </div>
    </div>
  )
}

export default RemoveGradeModal
