import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { URL } from '../constants/constants';
import Loading from '../components/Loading';


const StudentViewCourseModal = ({studentId}:any) => {
    const [data, setData] = useState([])
    useEffect(() => {
        async function getcoursesListStudent(){
            try{
                const response = await axios.get(URL + `/Enrollment/ByStudent/${studentId}`)
                setData(response.data);
            }
            catch(error){
            }
        }
        getcoursesListStudent();
    }, [])
  return (
    <div>
      {
        data.length === 0 ? (
        <>
         <Loading/>
        </>
        ):(
        <>
        {
            data.map((item:any) => (
                <div>
                    <div className='flex items-center justify-center border-2 rounded-md m-2'>
                        <p className='font-bold text-gray-600'>{item.course.title}</p>
                    </div>
                </div>
            ))
        }
        </>
        )
      }
    </div>
  )
}

export default StudentViewCourseModal
