import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Analytics = () => {
  return (
    <div className="max-h-[calc(100vh-80px)] flex flex-col justify-center items-center">
      <div className='mt-16'>
        <div>
          <p className='font-black text-2xl'>Pass vs Fail</p>
          <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur gaecenas id.</p>
        </div>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5', 'Course 6', 'Course 7', 'Course 8', 'Course 9'] }]}
              series={[{ data: [4, 3, 5, 2, 4, 7, 9, 6, 3], color:'#009A6A', id:'Pass', label:'Pass' }, { data: [1, 6, 3, 4, 2, 1, 7, 8, 5], color:'#99E6CE', id:'Fail', label:'Fail'}]}
              width={934}
              height={411}
            />
          </Paper>
        </Box>
        </div>
    </div>
  )
}

export default Analytics
