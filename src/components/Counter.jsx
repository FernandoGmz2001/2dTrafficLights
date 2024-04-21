import { useState, useEffect } from "react";
import "../styles/Counter.css";
import PropTypes from "prop-types";

function Counter({ color = "white", counterSettings }) {
  const [count, setCount] = useState(counterSettings.initialCount);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((prevCount) => {
        if (prevCount === counterSettings.finalCount) {
          return prevCount;
        }
        return prevCount + counterSettings.direction;
      });
    }, counterSettings.interval);

    return () => clearTimeout(timer);
  }, [count, counterSettings]);

  return (
    <div className={`counter ${color}`}>
      <h1>{count}</h1>
    </div>
  );
}

Counter.propTypes = {
  color: PropTypes.string,
  counterSettings: PropTypes.object.isRequired,
};

export default Counter;
