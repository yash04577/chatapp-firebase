import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'
import AuthContext from '../context/Context'

const Home = () => {

  const context = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(context);

  try {
    context.currentUser ? console.log("hiii") : navigate("/login");
  } catch (error) {
    context.currentUser ? console.log("hiii") : navigate("/login");
  }

  return (
    <div className='w-screen h-screen bg-[#a7bcff] flex justify-center items-center'>
        {/* container */}
        <div className='w-[65%] h-[80%] rounded-lg flex overflow-hidden'>
            <Sidebar />
            <Chat />
        </div>
    </div>
  )
}

export default Home