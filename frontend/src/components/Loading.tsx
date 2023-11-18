import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <div className='flex items-center justify-center w-full'>
        <CircularProgress />
    </div>
  )
}

export default Loading
