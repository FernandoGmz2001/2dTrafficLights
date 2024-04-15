import { useState, useEffect } from "react";
import "../styles/Street.css";
import Controls from "./Controls";
import TrafficLight from "./TrafficLight";

function Street() {
  const [light, setLight] = useState("green");
  const [light2, setLight2] = useState("red");

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const changeLights = async () => {
      setLight("green");
      await sleep(17500);
      setLight("");
      await sleep(500); 
      setLight("green")
      await sleep(500); 
      setLight("");
      await sleep(500); 
      setLight("green")
      await sleep(500); 
      setLight("");
      await sleep(500); 
      setLight("yellow");
      await sleep(3000); 
      setLight("red");
      await sleep(23000);
      changeLights(); 
    };
    changeLights();
    return () => {
    };
  }, []);

  useEffect(() => {
    const changeLights2 = async () => {
      setLight2("red");
      await sleep(23000);
      setLight2("green");
      await sleep(17500);
      setLight2("");
      await sleep(500); 
      setLight2("green")
      await sleep(500); 
      setLight2("");
      await sleep(500); 
      setLight2("green")
      await sleep(500); 
      setLight2("");
      await sleep(500); 
      setLight2("yellow");
      await sleep(3000); 
      changeLights2(); 
    };
    changeLights2();
    return () => {
    };
  }, []);

  return (
    <div className="street-bg">
      <Controls />
      <TrafficLight type="north" color={light} />
      <TrafficLight type="west" color={light2} />
      <TrafficLight type="east" color={light2} />
      <TrafficLight type="south" color={light} />
    </div>
  );
}

export default Street;