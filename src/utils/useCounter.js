import { useState, useEffect } from "react";

function useCounter(initialCount, interval, countDirection = -1,startCount = initialCount) {
  const [count, setCount] = useState(startCount);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count === 0 && countDirection === -1) return;
      setCount(prevCount => prevCount + countDirection);
    }, interval);

    return () => clearTimeout(timer);
  }, [count, interval, countDirection]);

  const reset = () => setCount(initialCount);

  return [count, reset];
}

export default useCounter;