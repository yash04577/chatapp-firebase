import React, { useContext } from 'react'
import Context from '../context/Context'
import Input from './Input'
import Messages from './Messages'
import {FcVideoCall} from "react-icons/fc"
import {BsCameraVideo} from "react-icons/bs"
import {BsFillCameraVideoFill} from "react-icons/bs"
import {BsFillPeopleFill} from "react-icons/bs"
import {AiTwotoneSetting} from "react-icons/ai"
const Chat = () => {

  const context = useContext(Context);
  // console.log()

  return (
    <div className='flex-[2]'>
        {/* topbar */}
        <div className='flex items-center justify-between bg-[#5d5b8d] h-[50px] p-[10px] text-gray-300'>
            <div>
                <p className='font-semibold capitalize'>{context?.selectedChat[1]?.userInfo?.displayName}</p>
            </div>
            <div className='flex items-center gap-4'>
                <BsFillCameraVideoFill className='text-2xl text-white'/>
                <BsFillPeopleFill className='text-2xl text-white'/>
                <AiTwotoneSetting className='text-2xl text-white'/>
            </div>
        </div>

        <Messages />
        <Input />
    </div>
  )
}

export default Chat