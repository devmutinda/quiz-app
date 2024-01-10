import { useState, useEffect } from 'react';

let interval;
const MAX_TIMER = 5000;
const MIN_TIMER = 1000;
export default function ProgressBar({ answered, checkQuestion }) {
  const [time, setTime] = useState({ timer: MAX_TIMER, remaining: MAX_TIMER });
  useEffect(() => {
    if (answered) {
      setTime((prev) => {
        return {
          timer: MIN_TIMER,
          remaining: (prev.remaining / prev.timer) * MIN_TIMER,
        };
      });
    }
  }, [answered]);

  useEffect(() => {
    interval = setInterval(() => {
      // console.log('Interval started');
      if (time.remaining <= 0) {
        setTime({ timer: MIN_TIMER, remaining: MIN_TIMER });
        checkQuestion();
      }
      setTime((prevTime) => ({
        ...prevTime,
        remaining: prevTime.remaining - 10,
      }));
    }, 10);

    return () => {
      clearInterval(interval);
      console.log('Interval cleared');
    };
  }, [time]);

  return (
    <progress
      className={answered ? 'answered' : ''}
      value={time.remaining}
      max={time.timer}
    />
  );
}
