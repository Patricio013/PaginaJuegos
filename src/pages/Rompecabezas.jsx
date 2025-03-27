import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AudioPlayer from "../componentes/AudioPlayer";
import rompecabezasMusic from "../assets/rompecabezas.mp3";
import "../estilos/Rompecabezas.css";
import puzzle from "../assets/rompecabezas.png";
import AnimatedPage from "../componentes/AnimatedPage"

const GRID_SIZE = 5; // Para el yo del futuro, si quiero cambiar la cantidad de casillar, nomas cambiar este numero
const TOTAL_PIEZAS = GRID_SIZE * GRID_SIZE;
const piezasCorrectas = [...Array(TOTAL_PIEZAS).keys()];

function Rompecabezas() {
  const navigate = useNavigate();
  const [piezas, setPiezas] = useState([]);

  useEffect(() => {
    setPiezas([...piezasCorrectas].sort(() => Math.random() - 0.5));
  }, []);

  const swapPiezas = (fromIndex, toIndex) => {
    const nuevasPiezas = [...piezas];
    [nuevasPiezas[fromIndex], nuevasPiezas[toIndex]] = [nuevasPiezas[toIndex], nuevasPiezas[fromIndex]];
    setPiezas(nuevasPiezas);

    if (JSON.stringify(nuevasPiezas) === JSON.stringify(piezasCorrectas)) {
      setTimeout(() => navigate("/final"), 800);
    }
  };

  return (
    <AnimatedPage>
      <AudioPlayer src={rompecabezasMusic} />
      <div className="rompecabezas" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
        {piezas.map((pos, index) => (
          <div
            key={index}
            className="pieza"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const fromIndex = e.dataTransfer.getData("text/plain");
              swapPiezas(fromIndex, index);
            }}
            style={{
              backgroundImage: `url(${puzzle})`,
              backgroundSize: `${GRID_SIZE * 100}px ${GRID_SIZE * 100}px`,
              backgroundPosition: `${-(pos % GRID_SIZE) * 100}px ${-Math.floor(pos / GRID_SIZE) * 100}px`,
            }}
          />
        ))}
      </div>
    </AnimatedPage>
  );
}

export default Rompecabezas;
