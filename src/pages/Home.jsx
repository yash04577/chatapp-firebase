import { doc, setDoc } from 'firebase/firestore'
import { getToken } from 'firebase/messaging'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'
import Context from '../context/Context'
import AuthContext from '../context/Context'
import { db, messaging } from '../firebase'

const Home = () => {

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission == 'granted') {
      const token = await getToken(messaging, { vapidKey: 'BLoj_aMrOY0L0sK_1Q-KICe7cvxkHOKBybZmXLMmAND6-ijJnI5L4VUDunvpAHieTd1Z8Bj2BqGaym6mHS_Xmmc' })
      console.log("token ", token)


      const res = await setDoc(doc(db, "tokens", context?.currentUser?.uid), {
        displayName: context.currentUser.displayName,
        email: context.currentUser.email,
        photoURL: context.currentUser.photoURL,
        uid: context.currentUser.uid,
        token
      });

      console.log("token saved", res)

    }
    else if (permission == 'denied') {
      const permission = await Notification.requestPermission();
    }
  }

  useEffect(() => {
    requestPermission();
  },[context])


  
  // console.log(context);

  try {
    context.currentUser ? console.log("hiii") : navigate("/login");
  } catch (error) {
    context.currentUser ? console.log("hiii") : navigate("/login");
  }




  return (
    <div className='w-screen h-screen bg-[#a7bcff] flex justify-center items-center'>
      {/* container */}
      <div className='w-[65%] h-[80%] sm:w-[90%] sm:h-[90%] rounded-lg flex overflow-hidden'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home