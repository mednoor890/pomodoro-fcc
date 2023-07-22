import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App(): JSX.Element {
  const [session, setSession] = useState<number>(25);
  const [pause, setPause] = useState<number>(5);
  const [timerState, setTimerState] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(session * 60);
  const [isSession, setIsSession] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  function format(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  useEffect(() => {
    setTimeLeft(session * 60);
  }, [session]);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    const playAudio = () => {
      const audioElement = audioRef.current;
      if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
      }
    };

    if (timerState) {
      countdownInterval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            clearInterval(countdownInterval);
            setTimerState(false);
            playAudio();

            if (isSession) {
              setIsSession(false);
              setTimeLeft(pause * 60);
              setTimerState(true);
            } else {
              setIsSession(true);
              setTimeLeft(session * 60);
              setTimerState(true);
            }
            return 0;
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 1000);
    }
    return () => {
      clearInterval(countdownInterval);
    };
  }, [timerState, session, pause, isSession]);

  const startTimer = () => {
    setTimerState((prevState) => !prevState);
  };

  const reset = () => {
    setSession(25);
    setPause(5);
    setIsSession(true);
    setTimeLeft(25 * 60);
    setTimerState(false);

    // Stop and rewind the audio when reset button is clicked
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  };

  const handleIncrement = (value: number, setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter((prevValue) => (prevValue + value <= 60 ? prevValue + value : prevValue));
  };

  const handleDecrement = (value: number, setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter((prevValue) => (prevValue - value >= 1 ? prevValue - value : prevValue));
  };

  return (
    <>
      <div className="container">
        <div id='break-label'>
          Break Length
          <h1 id='break-length'>{pause}</h1>
          <button id='break-increment' onClick={() => handleIncrement(1, setPause)}>increase</button>
          <button id='break-decrement' onClick={() => handleDecrement(1, setPause)}>decrease</button>
        </div>
        <div id='session-label'>
          Session Length
          <h1 id='session-length'>{session}</h1>
          <button id='session-increment' onClick={() => handleIncrement(1, setSession)}>increase</button>
          <button id='session-decrement' onClick={() => handleDecrement(1, setSession)}>decrease</button>
        </div>
      </div>
      <div id='timer-label'>
        <h1>{isSession ? 'Session' : 'Break'}</h1>
        <div id='time-left'>{format(timeLeft)}</div>
        <button id="start_stop" onClick={startTimer}>{timerState ? 'pause' : 'start'}</button>
        <button id="reset" onClick={reset}>reset</button>
        <audio id="beep" ref={audioRef} src="/BeepSound.wav"></audio>
      </div>
    </>
  );
}

export default App;
