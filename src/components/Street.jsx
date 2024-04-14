import { useState, useEffect } from "react";
import "../styles/Street.css";
import Controls from "./Controls";
import TrafficLight from "./TrafficLight";

function Street() {
  const [lights, setLights] = useState({
    north: "green",
    south: "green",
    east: "red",
    west: "red",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setLights((prevLights) => ({
        north: prevLights.north === "green" ? "red" : "green",
        south: prevLights.south === "green" ? "red" : "green",
        east: prevLights.east === "red" ? "green" : "red",
        west: prevLights.west === "red" ? "green" : "red",
      }));
    }, 5000); // Cambia las luces cada 5 segundos

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="street-bg">
      <Controls />
      <TrafficLight type="west" color={lights.west} />
      <TrafficLight type="north" color={lights.north} />
      <TrafficLight type="east" color={lights.east} />
      <TrafficLight type="south" color={lights.south} />
    </div>
  );
}

export default Street;