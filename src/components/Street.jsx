import { useState, useEffect } from "react";
import "../styles/Street.css";
import Controls from "./Controls";
import TrafficLight from "./TrafficLight";
import Counter from "./Counter";
import useCounter from "../utils/useCounter";

function Street() {
  const [light, setLight] = useState("green");
  const [light2, setLight2] = useState("red");
  const [greenCounter, resetGreenCounter] = useCounter(5, 1000, -1, 5);
  const [flashingCounter, resetFlashingCounter] = useCounter(3, 1000, 1,3);
  const [yellowCounter, resetYellowCounter] = useCounter(3, 1000, 1);
  const [lightState, setLightState] = useState("green");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

useEffect(() => {
  const changeLights = async () => {
    setLight("green");
    setLightState("green");
    await sleep(16000);
    resetGreenCounter();
    resetFlashingCounter()
    setLightState("flashing-green");
    setLight("");
    await sleep(500);
    setLight("green");
    await sleep(500);
    setLight("");
    await sleep(500);
    setLight("green");
    await sleep(500);
    setLight("");
    await sleep(500);
    setLight("green");
    await sleep(500);
    setLightState("yellow");
    setLight("yellow");
    await sleep(2500);
    setLight("red");
    setLightState("red");
    await sleep(23500);
    resetYellowCounter();
    changeLights();
  };
  changeLights();
  return () => {};
}, []);

  useEffect(() => {
    const changeLights2 = async () => {
      setLight2("red");
      await sleep(23500);
      setLight2("green");
      await sleep(16000);
      setLight2("");
      await sleep(500);
      setLight2("green");
      await sleep(500);
      setLight2("");
      await sleep(500);
      setLight2("green");
      await sleep(500);
      setLight2("");
      await sleep(500);
      setLight2("green");
      await sleep(500);
      setLight2("");
      setLight2("yellow");
      await sleep(3000);
      changeLights2();
    };
    changeLights2();
    return () => {};
  }, []);

  return (
    <div className="street-bg">
      <Controls />
      <div className="counter-container">
        <Counter
          counter={
            lightState == "green"
              ? greenCounter
              : lightState == "flashing-green"
              ? flashingCounter
              : yellowCounter
          }
        />
      </div>
      <TrafficLight type="north" color={light} />
      <TrafficLight type="west" color={light2} />
      <TrafficLight type="east" color={light2} />
      <TrafficLight type="south" color={light} />
    </div>
  );
}

export default Street;
