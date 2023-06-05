import React, { useContext, useEffect, useRef } from 'react'
import Context from '../context/Context'
import Message from './Message'

const Messages = () => {

  const context = useContext(Context);
  const containerRef = useRef();
  
  const scroll = () =>{
    // containerRef.current?.scrollIntoView({ behavior: "smooth" })
    // containerRef.current.scrollTop = containerRef.current.scrollHeight;
    
    setTimeout(()=>{
      containerRef.current.scrollTop = containerRef.current.scrollHeight;

    },1000)
    // containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }

  useEffect(()=>{
    scroll();
  },[context.messages])

  return (
    
    <div className='bg-[#ddddf7] h-[calc(100%-100px)] px-4 overflow-y-auto' ref={containerRef}>
       {
          context?.messages?.map(message=><Message data={message} />)
       }

    </div>
  )
}

export default Messages