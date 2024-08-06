import React,{useEffect,useState,useRef} from 'react'

function Chatbox({socket, handleLeaveClick}) {
  const [messages,setMessages]=useState([]);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); 
  useEffect(() => {
    socket.on('response', (data) => setMessages(data));
  }, [socket, messages]);
  return (
    <div className='chatbox-main' ref={containerRef}>
      <div className='chatbox-button'>
        <button className='leave-button' onClick={handleLeaveClick}>Leave Chat</button>
      </div>
      {messages.map((item, index) => (
        <div key={index} className={item.name === sessionStorage.getItem('userName') ? 'your-message' : 'other-message'}>
          <div className='message'>
            <div className='message-sender'>
              {item.name === sessionStorage.getItem('userName') ? 'You' : item.name}
            </div>
            <div className='message-content'>{item.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chatbox
