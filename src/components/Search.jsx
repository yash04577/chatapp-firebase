import React, { useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase';
import Context from '../context/Context';


const Search = () => {

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);

    const context = useContext(Context);
    const {currentUser} = context;

    const handleSearch = async () => {
        try {

            const q = query(collection(db, "users"), where("displayName", "==", username))

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });

        } catch (error) {
            console.log(error)
        }

    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async() =>{
        const combinedId = currentUser.uid > user.uid 
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid

        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if(!res.exists()){
                await setDoc(doc(db, "chats", combinedId), {messages:[]});

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId+".userInfo"]:{
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        lastMessage:"",
                    },
                    [combinedId+".date"]: serverTimestamp(),
                })

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId+".userInfo"]:{
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        lastMessage:"",
                    },
                    [combinedId+".date"]: serverTimestamp(),
                })
            }

            setUser(null);
            setUsername("");
        } catch (error) {
            console.log(error)
        }

    }

    return (


        <div className='px-2'>
            <div>
                <input onChange={e => setUsername(e.target.value)} value={username} onKeyDown={handleKey} type="text" placeholder='find a user' className='w-full bg-transparent outline-none px-2 border-b border-gray-400 capitalize mt-2 mb-1' />
            </div>

            {/* searched User */}
            {
                user &&
                <div className='flex gap-2' onClick={handleSelect}>
                    <div>
                        <img src={user?.photoURL} alt="" className='w-[50px] h-[50px] rounded-[50%]' />
                    </div>
                    <div>
                        <p className='font-bold items-center justify-center'>{user?.displayName}</p>
                    </div>
                </div>
            }

        </div>
    )
}

export default Search