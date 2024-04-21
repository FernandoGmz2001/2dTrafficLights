import { useState, useEffect } from "react";
import "../styles/Street.css";
import Controls from "./Controls";
import TrafficLight from "./TrafficLight";
import Counter from "./Counter";
// import useCounter from "../utils/useCounter";

function Street() {
  const [light, setLight] = useState("green");
  const [light2, setLight2] = useState("red");
  const [counterName, setCounterName] = useState("green");
  const [count, setCount] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const GREEN_TIME = 16000;
  const YELLOW_TIME = 2500;
  const FLASH_TIME = 500;
  const RED_TIME = 2000;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const trafficLights = async () => {
      if (!isRunning) {
        setLight("");
        setLight2("");
        setCounterName("");
        await sleep(100000)
        return;
      }
      // Controla las luces de tráfico verticales
      setLight("green");
      setCounterName("green");
      await sleep(GREEN_TIME);
      setCounterName("flashing-green");
      setLight("blink");
      await sleep(FLASH_TIME);
      setLight("green");
      await sleep(FLASH_TIME);
      setLight("blink");
      await sleep(FLASH_TIME);
      setLight("green");
      await sleep(FLASH_TIME);
      setLight("blink");
      await sleep(FLASH_TIME);
      setLight("green");
      await sleep(FLASH_TIME);
      setLight("blink");
      setLight("yellow");
      setCounterName("yellow");
      await sleep(YELLOW_TIME);
      setLight("blink");
      await sleep(FLASH_TIME);
      setLight("red");
      setCounterName("red");
      await sleep(RED_TIME);

      // Controla las luces de tráfico horizontales
      setLight2("green");
      setCounterName("green");
      await sleep(GREEN_TIME);
      setCounterName("flashing-green");
      setLight2("blink");
      await sleep(FLASH_TIME);
      setLight2("green");
      await sleep(FLASH_TIME);
      setLight2("blink");
      await sleep(FLASH_TIME);
      setLight2("green");
      await sleep(FLASH_TIME);
      setLight2("blink");
      await sleep(FLASH_TIME);
      setLight2("green");
      await sleep(FLASH_TIME);
      setLight2("blink");
      setLight2("yellow");
      setCounterName("yellow");
      await sleep(YELLOW_TIME);
      setLight2("blink");
      await sleep(FLASH_TIME);
      setLight2("red");
      setCounterName("red");
      await sleep(RED_TIME);
    };

    trafficLights();

    return () => {};
  }, [isRunning]);

  useEffect(() => {
    if (counterName === "flashing-green") {
      const interval = setInterval(() => {
        setCount((prevCount) => (prevCount < 3 ? prevCount + 1 : 1));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [counterName]);

  function running() {
    setIsRunning(!isRunning);
    if (!isRunning) {
      window.location.reload();
    }
  }

  return (
    <div className="street-bg">
      <div className="controls-container">
        <button className="btn btn-yellow">Preventivas</button>
        {/* <button className="btn btn-restart">Reiniciar</button> */}
        <button className={`btn btn-restart`} onClick={running}>{isRunning ? "Detener" : "Iniciar"}</button>
        {/* <button className={`btn ${isStopped ? 'btn-start' : 'btn-stop'}`} onClick={toggleStopStart}>
        {isStopped ? 'Iniciar' : 'Detener'}
      </button> */}
      </div>
      {/* <Controls /> */}
      <div className="counter-container">
        {counterName === "green" && (
          <Counter
            counterSettings={{
              initialCount: 15,
              direction: -1,
              interval: 1000,
            }}
            color={light}
          />
        )}
        {counterName === "flashing-green" && (
          <h1 className={`counter ${light} ${light2}`}>{count}</h1>
        )}
        {counterName === "yellow" && (
          <Counter
            counterSettings={{
              initialCount: 1,
              direction: 1,
              interval: 1000,
            }}
          />
        )}
        {counterName === "red" && (
          <Counter
            counterSettings={{
              initialCount: 1,
              direction: 1,
              interval: 1000,
            }}
          />
        )}
      </div>
      <TrafficLight type="north" color={light} />
      <TrafficLight type="west" color={light2} />
      <TrafficLight type="east" color={light2} />
      <TrafficLight type="south" color={light} />
    </div>
  );
}
export default Street;
