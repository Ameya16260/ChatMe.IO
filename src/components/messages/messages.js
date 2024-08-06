import React,{useState,useEffect} from 'react'
import './messages.css'
function Messages({socket}) {
  const value=sessionStorage.userName;
  const [typingStatus, setTypingStatus] = useState('');
  const [message,setMessage]=useState('');
  const [messages,setMessages]=useState([]);
  const [users,setUsers]=useState([]);
  const handleSubmit=(e)=>{
    e.preventDefault();
    if (message.trim() && sessionStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };
  const handleTyping=()=>{
    socket.emit('userTyping',`${sessionStorage.getItem('userName')} is typing`);
  }
  useEffect(() => {
    socket.on('response', (data) => setMessages([...messages, data]));
  }, [socket, messages]);
  useEffect(() => {
    socket.on('newUserResponse', (data) => {
      console.log('New user data received:', data); // Debug log
      setUsers(data);
    });
  }, [socket,users]);
  useEffect(()=>{
    socket.on('typingResponse',(data)=>{setTypingStatus(data);})
  },[socket]);
  return (
    <div className='container'>
      <div className='message'>{value} </div>
      {messages.map((item,index)=>(
        <div key={index}>{item.text}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input type='text' value={message} onChange={(e)=>setMessage(e.target.value)} onKeyDown={handleTyping}/>
        <button>send</button>
      </form>
      <div>
      {users.map((item,index)=>(
        <div key={index}>{item.USERNAME}</div>
      ))}
      </div>
      <div>{typingStatus}</div>
    </div>
  )
}

export default Messages
