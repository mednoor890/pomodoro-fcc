//import React from 'react'
import { useState } from 'react'
import './App.css'
function App() {
  const [session,setSession]=useState(25)
    const [pause, setPause] = useState(5)
    const [sessionMinutes, setSessionMinutes] = useState(25)
const format=(timestamp:number):string=>
{
  const date= new Date(timestamp*1000)
  const minutes=date.getMinutes();
  const seconds=date.getSeconds();
  //return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

}
const sessionTimestamp: number = sessionMinutes * 60; // Convert minutes to seconds

  return (
    <>
    
      <div id='break-label'>
      Break Length
      <h1 id='break-length'> {pause}</h1>
            <button id='break-increment'>increase</button>
            <button id='break-decrement'>decrease</button>

        </div>
        <div id='session-label'>
      Session Length
      <h1 id='session-length'>{session}</h1>
           <button id='session-increment'>increase</button>
           <button id='session-decrement'>decrease</button>

        </div>
        <div id='timer-label'>
          <h1>Session</h1>
          <div id='time-left'>{format(sessionTimestamp)}</div>
          <button id="start_stop">start/ pause</button>
          <button id="reset">reset</button>
          </div>
    </>
  )
}

export default App
