import React, { useState, useEffect } from "react";
import './countdown.css';
import ConfettiExplosion from 'react-confetti-explosion';

function Countdown() {
  const [countdown, setCountdown] = useState(0); // set initial countdown time in seconds
  const [isExploding, setIsExploding] = useState(false);

  let first = true;

  function firstFunc() {
    first = false;
    console.log(first);
  }

  useEffect(() => {
    const timer =
      countdown > 0 &&
      setInterval(() => {
        setCountdown(countdown - 1);
        if(countdown == 0 && !first) {
            setIsExploding(true)
          } else {
            setIsExploding(false)
          }
      }, 1000);
    return () => clearInterval(timer);
  }, [countdown + 1]);

  return (
    <div className="counter">
      Countdown: {countdown.toLocaleString()}<br />
      {isExploding && <ConfettiExplosion />}
      <button onClick={() => {setCountdown(3); firstFunc()}}>Start timer</button>
    </div>
  );
}

export default Countdown;
