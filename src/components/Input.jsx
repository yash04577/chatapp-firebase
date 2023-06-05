import { arrayUnion, doc, serverTimestamp, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import Context from '../context/Context';
import { db, storage } from '../firebase';
import fileImg from "../images/file.png"
import { AiOutlineFileImage } from "react-icons/ai"

const Input = () => {

  const [img, setImg] = useState(null);
  const [text, setText] = useState("");
  const context = useContext(Context);
  const { currentUser } = context;


  const handleSend = async () => {

    if (img) {

      const storageRef = ref(storage, Date.now().toString());
      const uploadTask = uploadBytesResumable(storageRef, img);
      console.log("if")
      uploadTask.on(
        (error) => {
          console.log("error on uploading file ", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

            await updateDoc(doc(db, "chats", context.selectedChat[0]), {
              messages: arrayUnion({
                id: uuid(),
                text,
                img: downloadURL,
                senderId: currentUser.uid,
                date: Timestamp.now(),
              })
            })
          });

        }
      );

    }
    else {
      await updateDoc(doc(db, "chats", context.selectedChat[0]), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })





      // to update last message

      const combinedId = context.selectedChat[0];


      const documentRef = doc(db, 'userChats', currentUser.uid);
      const dataToUpdate = {
        [combinedId]: {
          userInfo: {
            lastMessage: text,
          },
          date: serverTimestamp(),
        },
      };
      
      await setDoc(documentRef, dataToUpdate, { merge: true });
      
      const documentRef2 = doc(db, 'userChats', context.selectedChat[1].userInfo.uid);
      const dataToUpdate2 = {
        [combinedId]: {
          userInfo: {
            lastMessage: text,
          },
          date: serverTimestamp(),
        },
      };

      await setDoc(documentRef2, dataToUpdate2, { merge: true });

    }

    setText("");
    setImg(null)
  }

  return (
    <div className='flex'>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='Type Something...' className='bg-white text-black outline-none w-full h-[50px] px-3' />
      <div className='flex w-[[20%] bg-white items-center pr-2 gap-2'>

        <label>
          <AiOutlineFileImage className='text-green-500 text-3xl' />
          <input type="file" className='text-black hidden' name="" onChange={(e) => setImg(e.target.files[0])} id="" />
        </label>

        <button className='h-[30px] px-[10px] flex justify-center items-center bg-[#5e5ba7cf]' onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input