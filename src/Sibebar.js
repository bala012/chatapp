import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import SidebarChannel from './SidebarChannel'
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt'
import  InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CallIcon from '@material-ui/icons/Call'
import { Avatar } from '@material-ui/core'
import HeadSetIcon from '@material-ui/icons/Headset'
import MicIcon from '@material-ui/icons/Mic'
import SettingsIcon from '@material-ui/icons/Settings'
import {useDispatch, useSelector } from 'react-redux'
import { selectUser ,logout} from './features/userSlice'
import { auth } from './firebase'
import db from './firebase'


function Sibebar() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [channels, setChannels ] = useState([])
    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data()
            })))
        ))
    }, [])

    const handleChannel = () => {
        const channelName = prompt('Enter a channel name')
        if(channelName){
            db.collection('channels').add({
                channelName: channelName
            })
        }
    }

    const onClickHandler = () =>{
        dispatch(logout())
    }

    return (
        <div className = "sidebar">
            <div className = "sidebar__top">
                <h3>{user.displayName}</h3>
                <p onClick={onClickHandler}>logout</p>
                <ExpandMoreIcon />
            </div>
            <div className = "sidebar__channels">
                <div className = "sidebar__channelsHeader">
                    <div className = "sidebar__header">
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon 
                        onClick = {handleChannel}
                        className = "sidebar__addChannel" />
                </div>
                <div className = "sidebar__channelsList">
                    { channels.map(({ id, channel}) => (
                        <SidebarChannel
                            key = {id}
                            id = {id}
                            channelName = {channel.channelName}
                        />
                    ))}
            </div>
            </div> 
           
            <div className = 'sidebar__profile'>
                <Avatar 
                    className = "sidebar__profileAvatar"
                    onClick = { () => auth.signOut()}
                    src = {user.photo}
                />
                <div className = "sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    
                </div>
                <div className = "sidebar__profileIcons">
            
                </div>
            </div>
        </div>
    )
}

export default Sibebar
