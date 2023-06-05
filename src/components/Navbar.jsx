import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context'
import { auth } from '../firebase';

const Navbar = () => {

  const navigate = useNavigate();
  const context = useContext(Context);

  const logoutHandler = () =>{
    signOut(auth);
    navigate("/login");
  }

  return (
    <div className='flex items-center bg-[#2f2d52] h-[50px] p-[10px] justify-between  text-[#ddddf7]'>
        <span>Lama chat</span>
        <div className='flex items-center gap-2 justify-center'>
            <img src={context?.currentUser?.photoURL} className='h-[24px] w-[24px] rounded-[50%]' alt="img" />
            <span className='font-semibold capitalize'>{context?.currentUser?.displayName}</span>
            <button onClick={logoutHandler} className='h-[30px] flex items-center px-[10px] bg-[#5e5ba7cf] border-none'>Logout</button>
        </div>
    </div>
  )
}

export default Navbar