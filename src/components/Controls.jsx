import { useState } from "react";
import "../styles/Controls.css"

function Controls() {
  const [isStopped, setIsStopped] = useState(false);

  const toggleStopStart = () => {
    setIsStopped(!isStopped);
  };

  return (
    <div className="controls-container">
      <button className="btn btn-yellow">Amarillo</button>
      <button className="btn btn-restart">Reiniciar</button>
      <button className={`btn ${isStopped ? 'btn-start' : 'btn-stop'}`} onClick={toggleStopStart}>
        {isStopped ? 'Iniciar' : 'Detener'}
      </button>
    </div>
  );
}

export default Controls;