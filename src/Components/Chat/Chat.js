import React, { useEffect, useState } from 'react';
import {user} from '../Join/Join';
import socketIO from 'socket.io-client';
import Message from '../Message/Message';
import './Chat.css';
import sendLogo from '../../images/send.png';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import closeIcon from '../../images/closeIcon.png'
let socket;
const ENDPOINT = "http://localhost:5000/";

const Chat = () => {
    const [id,setId] = useState('');
    const [messages,setMessages] = useState([])

    const send = ()=>{
      const message = document.getElementById('chatInput').value;
        socket.emit('message',{message});
        document.getElementById('chatInput').value="";

    }
    console.log(messages);
    useEffect(()=>{
         socket = socketIO(ENDPOINT,{transports:['websocket']})
        socket.on('connect',()=>{
            alert('Connected')
            setId(socket.id);
        })
        console.log(socket);
        socket.emit('joined',{user})

        socket.on('welcome',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message)
        })
        socket.on('userJoined',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message);
        })
        socket.on('leave',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message)
        })
        return ()=>{
            socket.emit('disconect')
            socket.off()

        }
    },[])

    useEffect(()=>{
        socket.on('sendMessage',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message,data.id)
        })
        return()=>{
            socket.off();

        }
    },[messages])

  return (
    <div className='chatPage'>
        <div className="chatContainer">
            <div className="header">
                <h2>S Chat</h2>
                <a href=""><img src={closeIcon} alt="close" /></a> 
            </div>
            <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id=== id ?'right':'left'} />)}
                </ReactScrollToBottom>
            <div className="inputBox">
                <input onKeyPress={(e)=>e.key==='Enter' ? send():null} type="text"id='chatInput' />
                <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
            </div>
        </div>
    </div>
  )
}

export default Chat