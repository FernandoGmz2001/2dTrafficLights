import { useState, useEffect } from "react";
import "../styles/Street.css";
import Controls from "./Controls";
import TrafficLight from "./TrafficLight";
import Counter from "./Counter";
import useCounter from "../utils/useCounter";

function Street() {
  const [light, setLight] = useState("green");
  const [light2, setLight2] = useState("red");
  const [counterName, setCounterName] = useState("green");
  const [greenCounter, resetGreen] = useCounter(15, 1000, -1, 15, 15);
  const [flashingGreen, resetFlashingGreen] = useCounter(3, 1000, 1, 1, 1, 0);
  const [yellowCounter, resetYellow] = useCounter(3, 1000, 1, 1, 1, 0);
  const [redCounter, resetRed] = useCounter(3, 1000, 1, 1, 1, 0);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const verticalTrafficLights = async () => {
      setLight("green");
      await sleep(16000);
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
      setLight("");
      await sleep(500);
      setLight("yellow");
      await sleep(3000);
      setLight("");
      await sleep(500);
      setLight("red");
      await sleep(23000);
      verticalTrafficLights();
    };
    verticalTrafficLights();
    return () => {};
  }, []);

  useEffect(() => {
    const horizontalTrafficLights = async () => {
      setLight2("red");
      await sleep(23500);
      resetGreen()
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
      await sleep(2500);
      setLight("");
      await sleep(500);
      horizontalTrafficLights();
    };
    horizontalTrafficLights();
    return () => {};
  }, []);

  useEffect(() => {
    const timer = async () => {
      resetGreen();
      setCounterName("green");
      await sleep(16000);
      resetFlashingGreen();
      setCounterName("flashing-green");
      await sleep(3500)
      setCounterName("yellow");
      resetYellow();
      await sleep(3500);
      resetRed();
      setCounterName("red");
      await sleep(2000);
      timer();
    };
    timer();
    return () => {};
  }, []);

  return (
    <div className="street-bg">
      <Controls />
      <div className="counter-container">
        {counterName === "green" && (
          <Counter counter={greenCounter} color={"green"} />
        )}
        {counterName === "flashing-green" && (
          <Counter counter={flashingGreen} color={"green"} />
        )}
        {counterName === "yellow" && (
          <Counter counter={yellowCounter} color={"yellow"} />
        )}
        {counterName === "red" && (
          <Counter counter={redCounter} color={"red"} />
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
import  { useState, useEffect } from "react";
import "../styles/Street.css";
import Controls from "./Controls";
import TrafficLight from "./TrafficLight";
import Counter from "./Counter";
import useCounter from "../utils/useCounter";

function Street() {
  const [lights, setLights] = useState({
    north: "green",
    west: "red",
    east: "red",
    south: "green",
  });

  const phases = [
    { name: "green", duration: 15 },
    { name: "flashing-green", duration: 3 },
    { name: "yellow", duration: 3 },
    { name: "red", duration: 2 }
  ];

  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const currentPhase = phases[currentPhaseIndex];

  const [counter, resetCounter] = useCounter(currentPhase.duration, 1000, -1, currentPhase.duration, currentPhase.duration);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const timer = async () => {
      await sleep(currentPhase.duration * 1000); // Esperar hasta que termine la fase actual
      setCurrentPhaseIndex((prevIndex) => (prevIndex + 1) % phases.length); // Pasar a la siguiente fase
      resetCounter(); // Reiniciar el contador de la fase
      timer(); // Reiniciar el temporizador para la próxima fase
    };

    timer(); // Iniciar el temporizador al montar el componente

    return () => {}; // Limpiar el efecto (no se necesita en este caso)
  }, [currentPhase, resetCounter, phases.length]);

  useEffect(() => {
    const updateLights = async () => {
      const { name } = phases[currentPhaseIndex];
      const newLights = {};

      switch (name) {
        case "green":
          newLights.north = "green";
          newLights.west = "";
          newLights.east = "";
          newLights.south = "green";
          break;
        case "flashing-green":
          newLights.north = "green";
          newLights.west = "";
          newLights.east = "";
          newLights.south = "green";
          break;
        case "yellow":
          newLights.north = "";
          newLights.west = "yellow";
          newLights.east = "yellow";
          newLights.south = "";
          break;
        case "red":
          newLights.north = "red";
          newLights.west = "red";
          newLights.east = "red";
          newLights.south = "red";
          break;
        default:
          break;
      }

      setLights(newLights);
    };

    updateLights(); // Actualizar las luces al montar el componente

    return () => {}; // Limpiar el efecto (no se necesita en este caso)
  }, [currentPhaseIndex, phases]);

  return (
    <div className="street-bg">
      <Controls />
      <div className="counter-container">
        <Counter counter={counter} color={currentPhase.name === "flashing-green" ? "green" : currentPhase.name} />
      </div>
      <TrafficLight type="north" color={lights.north} />
      <TrafficLight type="west" color={lights.west} />
      <TrafficLight type="east" color={lights.east} />
      <TrafficLight type="south" color={lights.south} />
    </div>
  );
}

export default Street;
