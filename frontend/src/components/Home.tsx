import photo from '../assets/photoright.png'
import { Button } from '@mui/material'
const Home = () => {
  return (
    <div className='flex flex-col md:flex-row overflow-auto lg:rounded-tl-3xl'>
        <div className='flex items-center md:max-h-[calc(100vh-80px)] justify-center items-center'>
          <div className=' flex flex-col w-2/3 pt-8 justify-center'>
            <p className='font-black text-xl md:text-5xl text-gray-900'>Harmony in Learning</p>
            <p className='font-black text-xl md:text-5xl text-green-600'>Uniting Curiosity and Knowledge</p>
            <p className='text-gray-500 mt-4'>Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
            <div className='md:mt-4 flex flex-col md:flex-row justify-start items-center'>
              <Button variant="contained" style={{ backgroundColor: '#4CAF50', marginTop:'5px' }}>Explore</Button>
              <Button variant="outlined" style={{ color: '#4CAF50', marginLeft:'10px', marginTop:'5px', borderColor:'#4CAF50' }}>Show Video</Button>
            </div>
          </div>
        </div>
        <div className='w-full p-4 md:p-4 md:w-2/4 md:max-h-[calc(100vh-80px)] mt-8 md:mt-0 md:mx-4 flex justify-center items-center shadow-inner rounded '>
          <div className=' flex justify-center w-full '>
            <img src={photo} alt='Picture'/>
          </div>
        </div>
      </div>
  )
}

export default Home
