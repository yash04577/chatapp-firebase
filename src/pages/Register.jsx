import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { async } from '@firebase/util';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import {MdPhotoLibrary} from "react-icons/md"


const Register = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        const res = await createUserWithEmailAndPassword(auth, email, password);

        const storageRef = ref(storage, Date.now().toString());
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            (error) => {
                console.log("error on uploading file ", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    
                    await updateProfile(res.user, {
                        displayName,
                        photoURL: downloadURL,
                    })

                    await setDoc(doc(db, "users", res.user.uid), {
                        displayName,
                        email,
                        photoURL: downloadURL,
                        uid: res.user.uid,
                    });
                    
                    await setDoc(doc(db, "userChats", res.user.uid), {});
                    navigate("/");
                });

            }
        );

        console.log(res)

    }

    return (
        <div className='w-screen h-screen bg-blue-300 flex justify-center items-center '>
            {/* form container */}
            <form onSubmit={handleSubmit} className='bg-white text-black flex flex-col sm:w-[90%] rounded-lg w-[30%] px-8 py-4'>
                <p className='text-center text-3xl font-semibold'>Lama Chat</p>
                <p className='text-center'>Register</p>
                <input type="text" placeholder='Name' className='bg-white border-b border-gray-400 px-2 py-1 mb-3' />
                <input type="text" placeholder='Email' className='bg-white border-b border-gray-400 px-2 py-1 mb-3' />
                <input type="text" placeholder='Password' className='bg-white border-b border-gray-400 px-2 py-1 mb-5' />
                <label className='flex items-center mb-3 gap-3'>
                    <MdPhotoLibrary className='text-3xl text-green-400'/>
                    <p className='text-blue-600'>Choose an Avatar</p>
                    <input type="file" className='bg-white mb-5 hidden' />
                </label>
                <button type="submit" className='bg-blue-600 mb-3'>Sign up</button>
                <Link to={"/login"} className='text-center' >You do have a account? Login</Link>
            </form>
        </div>
    )
}

export default Register