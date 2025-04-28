import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AudioPlayer from "../componentes/AudioPlayer";
import rompecabezasMusic from "../assets/rompecabezas.mp3";
import "../estilos/Rompecabezas.css";
import RompecabezasPC from "./Refactorizado/RompecabezasPC";
import RompecabezasMobile from "./Refactorizado/RompecabezasMobile";
import AnimatedPage from "../componentes/AnimatedPage";

const GRID_SIZE = 5; // Para el yo del futuro, si quiero cambiar la cantidad de casillar, nomas cambiar este numero
const TOTAL_PIEZAS = GRID_SIZE * GRID_SIZE;
const piezasCorrectas = [...Array(TOTAL_PIEZAS).keys()];

function Rompecabezas() {
  const navigate = useNavigate();
  const [piezas, setPiezas] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {isMobile ? (
        <RompecabezasMobile piezas={piezas} gridSize={GRID_SIZE} swapPiezas={swapPiezas} />
      ) : (
        <RompecabezasPC piezas={piezas} gridSize={GRID_SIZE} swapPiezas={swapPiezas} />
      )}
    </AnimatedPage>
  );
}

export default Rompecabezas;
