import React, { useState, useEffect } from "react";
import './countdown.css';
import ConfettiExplosion from 'react-confetti-explosion';

let first = true;

function Countdown() {
  const [countdown, setCountdown] = useState(0); // set initial countdown time in seconds
  const [isExploding, setIsExploding] = useState(false);

  function firstFunc() {
    first = false;
  }

  useEffect(() => {
    const timer =
      countdown > 0 &&
      setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
      if(countdown === 0 && !first) {
        setIsExploding(true)
      } else {
        setIsExploding(false)
      }
    return () => clearInterval(timer);
  }, [countdown + 1]);

  return (
    <div className="counter">
      Countdown: {countdown.toLocaleString()}<br />
      {isExploding && <ConfettiExplosion />}
      <button onClick={() => {setCountdown(10); firstFunc()}}>Start countdown (10sek)</button>
    </div>
  );
}

export default Countdown;
