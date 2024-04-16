import { useState, useEffect } from "react";

function useCounter(initialCount, interval, countDirection = -1) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count === 0 && countDirection === -1) return;
      setCount(prevCount => prevCount + countDirection);
    }, interval);

    return () => clearTimeout(timer);
  }, [count, interval, countDirection]);

  return count;
}

export default useCounter;
