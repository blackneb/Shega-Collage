import {useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { URL } from '../constants/constants';
import Loading from './Loading';

interface data{
  courseList: string[],
  passList:number[],
  failList:number[]

}
const initialData:data = {
  courseList:[],
  passList:[],
  failList:[]
}
const Analytics = () => {
  const [data, setData] = useState<data>(initialData);
  useEffect(() => {
    async function courseSummary(){
      try{
        const response = await axios.get(URL + '/Grade/course-summary')
        setData(response.data)
      }
      catch(error){

      }
    }
    courseSummary();
  }, [])
  return (
    <div className="max-h-[calc(100vh-80px)] flex flex-col justify-center items-center">
      <div className='mt-16'>
        <div>
          <p className='font-black text-2xl'>Pass vs Fail</p>
          <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur gaecenas id.</p>
        </div>
        {
          data?.courseList.length === 0?(
          <>
            <Loading/>
          </>
          ):(
          <>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <BarChart
                xAxis={[{ scaleType: 'band', data:data?.courseList }]}
                series={[{ data: data?.passList, color:'#009A6A', id:'Pass', label:'Pass' }, { data: data?.failList, color:'#99E6CE', id:'Fail', label:'Fail'}]}
                width={934}
                height={411}
              />
            </Paper>
          </Box>
          </>
          )
        }
        </div>
    </div>
  )
}

export default Analytics
