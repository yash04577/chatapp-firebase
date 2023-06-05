import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import Context from '../context/Context';
import { db } from '../firebase';

const Chats = () => {

    const [chats, setChats] = useState([]);
    const context = useContext(Context);

    useEffect(() => {

        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", context.currentUser.uid), (doc) => {
                setChats(doc.data());
                console.log(doc.data())
            });
        }

        context?.currentUser?.uid && getChats();

    }, [context.currentUser.uid])

    
    const handleSwitch = async(chat) =>{
        context.setSelectedChat(chat);
    }

    return (
        <div className=''>

            {
                Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat, index) => (

                    <div onClick={()=>handleSwitch(chat)} key={index} className={`flex gap-2 px-2 py-2 ${chat[0] == context.selectedChat[0] ? 'bg-[#2f2d52]' : ""} hover:bg-[#2f2d52]`}>
                        <div>
                            <img src={chat[1]?.userInfo?.photoURL} alt="" className='w-[50px] h-[50px] rounded-[50%]' />
                        </div>
                        <div>
                            <p className='capitalize font-semibold'>{chat[1]?.userInfo?.displayName}</p>
                            <p className='text-sm capitalize'>{chat[1]?.userInfo?.lastMessage}</p>
                        </div>
                    </div>
                ))
            }


        </div>
    )
}

export default Chats