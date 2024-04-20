import { useState, useEffect } from "react";
import "../styles/Street.css";
import Controls from "./Controls";
import TrafficLight from "./TrafficLight";
import Counter from "./Counter";
// import useCounter from "../utils/useCounter";

function Street() {
  const [light, setLight] = useState("green");
  const [light2, setLight2] = useState("red");
  const [blinking, setBlinking] = useState(false);
  const [counterName, setCounterName] = useState("green");
  const GREEN_TIME = 16000
  const YELLOW_TIME = 2500
  const FLASH_TIME = 500
  const RED_TIME = 2000

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

useEffect(() => {
  const trafficLights = async () => {
    // Controla las luces de tráfico verticales
    setLight("green");
    setCounterName("green");
    await sleep(GREEN_TIME);
    setLight("");
    await sleep(FLASH_TIME);
    setLight("green");
    // setCounterName("flashing-green");
    await sleep(FLASH_TIME);
    setLight("");
    await sleep(FLASH_TIME);
    setLight("green");
    await sleep(FLASH_TIME);
    setLight("");
    await sleep(FLASH_TIME);
    setLight("green");
    await sleep(FLASH_TIME);
    setLight("");
    setLight("yellow");
    setCounterName("yellow");
    await sleep(YELLOW_TIME);
    setLight("");
    await sleep(FLASH_TIME);
    setLight("red");
    setCounterName("red");
    await sleep(RED_TIME);

    // Controla las luces de tráfico horizontales
    setLight2("green");
    setCounterName("green");
    await sleep(GREEN_TIME);
    setLight2("");
    await sleep(FLASH_TIME);
    setLight2("green");
    setCounterName("flashing-green");
    await sleep(FLASH_TIME);
    setLight2("");
    await sleep(FLASH_TIME);
    setLight2("green");
    await sleep(FLASH_TIME);
    setLight2("");
    await sleep(FLASH_TIME);
    setLight2("green");
    await sleep(FLASH_TIME);
    setLight2("");
    setLight2("yellow");
    setCounterName("yellow");
    await sleep(YELLOW_TIME);
    setLight2("");
    await sleep(FLASH_TIME);
    setLight2("red");
    setCounterName("red");
    await sleep(RED_TIME);

    // Reinicia el ciclo
    trafficLights();
  };

  trafficLights();

  return () => {};
}, []);

  useEffect(() => {
    const timer = async () => {
      await sleep(GREEN_TIME);
      setCounterName("flashing-green");
      await sleep(3000)
    };
    timer();
    return () => {};
  }, []);

  return (
    <div className="street-bg">
      <Controls />
      <div className="counter-container">
        {counterName === "green" && (
          <Counter
            counterSettings={{
              initialCount: 15,
              direction: -1,
              interval: 1000,
            }}
          />
        )}
        {counterName === "flashing-green" && (
          <Counter
            counterSettings={{
              initialCount: 1,
              direction: 1,
              interval: 1000,
            }}
          />
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
