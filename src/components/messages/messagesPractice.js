import './messages.css'
import Chatbox from './chatbox/chatbox'
import SendMessage from './sendMessage/sendMessage'
import Sidebar from './sidebar/sidebar'
import Navbar from './navbar/navbar'
import Joinchat from './joinchat/joinchat'
import React, { useState } from 'react'

function MessagesPractice({socket}) {
  const [joinStatus,setJoinStatus]=useState(0);
  const userName=sessionStorage.getItem('userName');
  const [buttonValue,setButtonValue]=useState(0);
  const handleMenu=()=>{
    if(buttonValue===0){
      setButtonValue(1);
    }else{
      setButtonValue(0);
    }
  }
  const handleLeaveClick=()=>{
    setJoinStatus(0);
    socket.emit("userLeftChat",{UserName:userName});
  }
  const handleJoinClick=()=>{
    socket.emit('newUser',{USERNAME: userName,socketID: socket.id});
    setJoinStatus(1);
  }
  return (
    <div className='main'>
        <button className='menu-button' onClick={handleMenu}>{buttonValue===0? "Menu": "Close"}</button>
        <div className={`sidebar-main ${buttonValue===0? '':'hello' }`}>
          <div className='main-image'>

          <div className='user-profile-image'></div>
          </div>
        <div className='user-title'>{sessionStorage.getItem('userName')}</div>
        {joinStatus===0?(<></>):(<Sidebar socket={socket}/>)}
        </div>
        <div className='main-right'>
            { joinStatus===0? (<Joinchat handleJoinClick={handleJoinClick}/>):(<Chatbox socket={socket} handleLeaveClick={handleLeaveClick}/>)}
            {/* <Chatbox socket={socket}/> */}
           <SendMessage socket={socket} joinStatus={joinStatus}/>
        </div>
    </div>
  )
}

export default MessagesPractice
