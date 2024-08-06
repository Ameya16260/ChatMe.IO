import React, { useState,useEffect } from 'react';

function SendMessage({ socket,joinStatus }) {
  const [message, setMessage] = useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();
    if (message.trim() && sessionStorage.getItem('userName') && joinStatus===1) {
      socket.emit('message', {
        text: message,
        name: sessionStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  return (
    <div className='sendmessage-main'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='sendmessage-input'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type your message'
        />
        <button className='sendmessage-button' type='submit'>Send</button>
      </form>
      
    </div>
  );
}

export default SendMessage;
