import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
  
      useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
      };
  return (
    <div className='flex flex-row justify-between items-center bg-slate-900 text-neutral-200  ' >
      <p onClick={()=>navigate('/')} className=' cursor-pointer font-bold text-2xl p-3 '>JobTracker</p>
      <p onClick={()=>navigate('/searchjobs')} className=' text-lg ml-auto mr-5 hover:scale-105 cursor-pointer'>Search Jobs</p>
      <p onClick={()=>navigate('/jobs')} className=' text-lg mr-5 hover:scale-105 cursor-pointer'>My Jobs</p>
      <p
        onClick={handleLogout}
        className=' cursor-pointer mr-4 rounded hover:scale-105 hover:bg-blue-600 px-4 py-1 bg-blue-500 '
      >
        Logout
      </p>
    </div>
  )
}

export default Navbar
