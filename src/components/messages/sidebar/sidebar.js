import React,{useEffect, useState} from 'react'
import im from "../../../profile.jpg"

function Sidebar({socket}) {

  const [activeUsers,setActiveUsers]=useState([]);
  const current=sessionStorage.getItem('userName');
  useEffect(() => {
    socket.on('newUserResponse', (data) => {
      console.log('New user data received:', data); // Debug log
      setActiveUsers(data);
    });
  }, [socket,activeUsers]);
  const filteredUsers=activeUsers.filter(user => user.USERNAME !== current);
  return (
    <div className='sidebar-real-main'>
      <div className='online'>Online Users:</div>
      {filteredUsers.map((item,index)=>(
        <div className='activeUsers' key={index}>
          <div className='sidebar-image'>
            {/* <img src={im} height='100px'></img> */}
            </div>
            <div className='sidebar-user'>
            {item.USERNAME}
              </div> 
            </div>
      ))};
    </div>
  )
}

export default Sidebar
