import React from 'react'

function Joinchat({handleJoinClick}) {
  return (
    <div className='joinchat-main'>
        <button className='join-button' onClick={handleJoinClick}>Join Live Chat</button>
      
    </div>
  )
}

export default Joinchat
