import './App.css';
// import Messages from './components/messages/messages';
import MessagesPractice from './components/messages/messagesPractice';
import Signup from './components/signup/signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('https://chatme-io.onrender.com');

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Signup socket={socket}/>}></Route>
      <Route path='/messages' element={<MessagesPractice socket={socket}/>}></Route>

     </Routes>
     </BrowserRouter> 
    </div>
  );
}

export default App;
