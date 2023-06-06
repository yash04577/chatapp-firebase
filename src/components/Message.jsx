import React, { useContext } from 'react'
import Context from '../context/Context'

const Message = ({data}) => {

  const context = useContext(Context);

  return (
    <div className={`text-black flex my-3 gap-3 ${context.currentUser.uid == data.senderId ? 'justify-end ' : 'justify-start'} `}>
        {/* information div */}
        <div>
            {/* <img className='w-[40px] h-[40px] rounded-[50%]' src={data[1].img}/> */}
            {/* <p className='text-sm'>Just Now</p> */}
        </div>
        <div className=' bg-slate-50 rounded-lg overflow-hidden max-w-[50%]'>
            <p className={`px-4 py-2 ${context.currentUser.uid == data.senderId ? 'bg-[#5e5ba7cf] text-white' : ''} `}>{data?.text}</p>
            <img src={data?.img} className='' alt="" />
        </div>
    </div>
  )
}

export default Message