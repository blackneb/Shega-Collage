import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Course from './components/Course'
import Students from './components/Students'
import Grade from './components/Grade'
import NavBar from './components/NavBar'



const Routing = () => {
  return (
    <div>
        <BrowserRouter>
        <NavBar/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/course' element={<Course/>} />
                <Route path='/student' element={<Students/>} />
                <Route path='/grade' element={<Grade/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Routing
