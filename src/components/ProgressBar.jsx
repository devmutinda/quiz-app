import { useState, useEffect } from 'react';

let interval;
const MAX_TIMER = 5000;
const MIN_TIMER = 2000;
export default function ProgressBar({
  answered,
  checkQuestion,
  disabled,
  loadNextQuestion,
}) {
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
      setTime((prevTime) => ({
        ...prevTime,
        remaining: prevTime.remaining - 10,
      }));
    }, 10);

    return () => {
      clearInterval(interval);
      // console.log('Interval cleared');
    };
  }, [disabled]);

  if (time.remaining <= 0) {
    clearInterval(interval);

    if (disabled) {
      setTime({ timer: MAX_TIMER, remaining: MAX_TIMER });
      loadNextQuestion();
    } else {
      setTime({ timer: MIN_TIMER, remaining: MIN_TIMER });
      checkQuestion();
    }
  }

  return (
    <progress
      className={answered ? 'answered' : ''}
      value={time.remaining}
      max={time.timer}
    />
  );
}
