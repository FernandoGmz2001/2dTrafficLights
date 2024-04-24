import { useState, useEffect, useRef } from "react";
import "../styles/Street.css";
import TrafficLight from "./TrafficLight";
import Counter from "./Counter";

function Street() {
  const [light, setLight] = useState("green");
  const [light2, setLight2] = useState("red");
  const [counterName, setCounterName] = useState("green");
  const [count, setCount] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [simulateYellow, setSimulateYellow] = useState(false);
  const GREEN_TIME = 15500;
  const YELLOW_TIME = 2500;
  const FLASH_TIME = 500;
  const RED_TIME = 1500;

  const simulateYellowRef = useRef(simulateYellow);

  useEffect(() => {
    simulateYellowRef.current = simulateYellow;
  }, [simulateYellow]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if(simulateYellowRef.current) return
    const trafficLights = async () => {
      if (!isRunning) {
        setLight("");
        setLight2("");
        setCounterName("");
        await sleep(100000);
        return;
      }
      setCount(1);
      setLight("green");
      setCounterName("green");
      await sleep(GREEN_TIME);
    if(simulateYellowRef.current) return
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
      await sleep(FLASH_TIME);
      setCount(1);
      setLight("yellow");
      setCounterName("yellow");
      await sleep(YELLOW_TIME);
      setLight("blink");
      await sleep(FLASH_TIME);
      setLight("red");
      setCounterName("red");
      await sleep(RED_TIME);

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
      trafficLights();
    };

    trafficLights();

    return () => {};
  }, [isRunning, simulateYellow]);

  useEffect(() => {
    if (counterName === "flashing-green") {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [counterName]);

  useEffect(() => {
    const blinking = async () => {
      if (simulateYellowRef.current) {
        while (simulateYellowRef.current) {
          setLight("yellow");
          setLight2("yellow");
          await sleep(FLASH_TIME);
          setLight("");
          setLight2("");
          await sleep(FLASH_TIME);
          setCounterName("");
        }
        setCounterName("");
        return;
      }
    };
    blinking();
    return () => {};
  },[simulateYellow]);

  function running() {
    setIsRunning(!isRunning);
    if (!isRunning) {
      window.location.reload();
    }
  }
  function setYellow() {
    setSimulateYellow(!simulateYellow);
  }

  return (
    <div className="street-bg">
      <div className="controls-container">
        <button className="btn btn-yellow" onClick={setYellow}>
          {simulateYellow ? "Detener preventivas" : "Preventivas"}
        </button>
        <button className={`btn btn-start`} onClick={running}>
          {isRunning ? "Detener" : "Iniciar"}
        </button>
      </div>
      <div className="counter-container">
        {counterName === "green" && (
          <Counter
            counterSettings={{
              initialCount: 15,
              direction: -1,
              interval: 1000,
            }}
            color={"green"}
          />
        )}
        {counterName === "flashing-green" && (
          <h1 className={`counter green ${light} ${light2}`}>{count}</h1>
        )}
        {counterName === "yellow" && (
          <Counter
            counterSettings={{
              initialCount: 1,
              direction: 1,
              interval: 1000,
            }}
            color={light == "blink" || light2 == "blink" ?  "yellow blink" : "yellow"}
          />
        )}
        {counterName === "red" && (
          <Counter
            counterSettings={{
              initialCount: 1,
              direction: 1,
              interval: 1000,
            }}
            color="red"
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
