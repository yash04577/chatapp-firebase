import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await toast.promise(signInWithEmailAndPassword(auth, e.target[0].value, e.target[1].value), {
        pending: 'verifying details...',
        success: 'Login successfull 👌',
        error: 'Server error! Try again later 🤯'
      })
      navigate("/");

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className='w-screen h-screen bg-blue-300 flex justify-center items-center '>
      {/* form container */}
      <form onSubmit={handleSubmit} className='bg-white text-black flex flex-col sm:w-[90%] rounded-lg w-[30%] px-8 py-4'>
        <p className='text-center text-3xl font-semibold'>Lama Chat</p>
        <p className='text-center'>Login</p>
        <input type="text" placeholder='Email' className='bg-white border-b border-gray-400 px-2 py-1 mb-3' />
        <input type="text" placeholder='Password' className='bg-white border-b border-gray-400 px-2 py-1 mb-5' />
        <button type="submit" className='bg-blue-600 mb-3'>Login</button>
        <Link to={"/register"} className='text-center' >You don't have a account? Register</Link>
      </form>
    </div>
  )
}

export default Login