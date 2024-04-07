import { useState,useEffect } from 'react'

import './App.css'

 export default function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [message, setMessage] = useState(" ");
  const [clientmessage,setClientmessage] = useState(" ");


  useEffect(() => {
  const socket = new WebSocket("ws://localhost:8080")
  socket.onopen = () =>{
    console.log("CONNECTED");
    setSocket(socket)
    }
  socket.onmessage = (message) =>{
    console.log("Recieved message",message.data)
    setMessage(message.data)
  }
  }, [])
  

  if(!socket){
    return (
      <div>
        Connecting to Socket server... 
      </div>
    )
  }
  return (
    <>
    <input type="text" onChange={(e) => {
      setClientmessage(e.target.value)
    }}/>
    <button type="button" onClick={() =>{
      socket.send(clientmessage)
    }}>SEND</button>
    {message}       
    </>
  )
}



