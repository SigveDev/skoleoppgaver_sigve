import { useState, useEffect } from "react";

function Clock() {

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
        setTime(new Date());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="digitalClock">
        {time.toLocaleTimeString()}
    </div>
  );
}

export default Clock;
