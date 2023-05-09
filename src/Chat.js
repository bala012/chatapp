import { AddCircle, CardGiftcard, EmojiEmotions, Gif, SendRounded } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MicIcon from '@material-ui/icons/Mic'
import './Chat.css'
import ChatHeader from './ChatHeader'
import { selectChannelId, selectChannelName } from './features/appSlice'
import { selectUser } from './features/userSlice'
import db from './firebase'
import Message from './Message'
import firebase from 'firebase'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


function Chat() {
    const user = useSelector(selectUser)
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')

    useEffect(() => {
        if(channelId){
            db.collection('channels')
            .doc(channelId)
            .collection('messages')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
            setMessages(snapshot.docs.map((doc) => doc.data()).reverse())
            )
        }
    }, [channelId])

    const { transcript, resetTranscript,browserSupportsSpeechRecognition } = useSpeechRecognition()


    const sendMessage = (e) => {
        e.preventDefault()

        resetTranscript()

        db.collection('channels').doc(channelId).collection('messages').add({
            user: user,
            messsage: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('')
    }
    const StartListening=()=> SpeechRecognition.startListening({ continuous: false })

    useEffect(()=>{
        setInput( transcript)
    },[transcript])

    return (
        <div className = "chat">
            <ChatHeader 
                channelName = {channelName}
            />

            <div className = "chat__messages">
                { messages.map((message) => (
                    <Message 
                        timestamp = {message.timestamp}
                        message = {message.messsage}
                        user = {message.user}
                    />
                ))}
                

            </div>
            <div className = "chat__input">
                <AddCircle />
                <form>
                    <input 
                    value = {input}
                    onChange = {(e) => setInput(e.target.value)}
                    placeholder = {`message`}/>
                    <button 
                    onClick = {sendMessage}
                    disabled = {!channelId}
                    className = "chat__inputButton"
                    type = "submit">
                        send
                    </button>
                </form>
                <div className = "chat__inputIcons">
                    <SendRounded />
                    <EmojiEmotions fontSize = "large" />
                    <MicIcon onClick={StartListening}/>
            </div>
        </div>
    </div>
    )
}

export default Chat
