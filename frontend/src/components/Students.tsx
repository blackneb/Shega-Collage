import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
const Students = () => {
  return (
    <div className="max-h-[calc(100vh-80px)] w-full">
      <div>
        <Button variant="contained" startIcon={AddIcon} style={{ backgroundColor: '#4CAF50', marginTop:'5px' }}>Add New Student</Button>
      </div>
    </div>
  )
}

export default Students
