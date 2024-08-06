import React from 'react'
import { useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom';

function Signup({socket}) {
    const navigate=useNavigate();
    const [userName,setUserName]=useState('');
    const handleSubmit=(e)=>{
        socket.emit('newUserSignIn',{socketID:socket.id});
        e.preventDefault();
        sessionStorage.setItem('userName',userName);
        navigate('/messages');
    }
  return (
    <div className='signup-body'>

        <div className='signup-container'>
          <div className='signup-title'>ChatME.IO</div>
    <form onSubmit={handleSubmit}>
      <div className='signup-input-div'>

    <input type='text' className='signup-input' placeholder='Username' value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
      </div>
      <div className='signup-button-div'>

    <button className='signup-button'>SignIn</button>
      </div>
    </form>
        </div>
      
    </div>
  )
}

export default Signup
