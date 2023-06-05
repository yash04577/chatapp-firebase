import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import Context from "./Context";

const State = (props) => {


    const [currentUser, setCurrentUser] = useState({});
    const [selectedChat, setSelectedChat] = useState([]);
    const [messages, setMessages] = useState([]);

    const getMessages = async() => {

        const unsub = onSnapshot(doc(db, "chats", selectedChat[0]), (doc) => {
            setMessages(doc.data().messages)
        });

        messages.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
        });

    }

    useEffect(() => {
        setMessages([]);
        getMessages();
    }, [selectedChat])

    console.log(currentUser)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        })
    }, [])



    return (
        <Context.Provider value={{ currentUser, selectedChat, setSelectedChat, messages, setMessages }}>
            {props.children}
        </Context.Provider>
    )

}

export default State;
