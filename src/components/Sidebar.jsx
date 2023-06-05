import React, { useContext } from 'react'
import Context from '../context/Context'
import Chats from './Chats'
import Navbar from './Navbar'
import Search from './Search'

const Sidebar = () => {

  const context = useContext(Context);
  // ${context.selectedChat ? "sm:w-0" : "sm:w-full"}
  return (
    <div className={`w-[33%] ${context.selectedChat.length != 0 ? "sm:w-0" : "sm:w-full"} bg-[#3e3c61] `}>
        <Navbar />
        <Search />
        <Chats />
    </div>
  )
}

export default Sidebar