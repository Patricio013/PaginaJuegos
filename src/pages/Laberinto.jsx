import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/Laberinto.css";
import AnimatedPage from "../componentes/AnimatedPage";
import AudioPlayer from "../componentes/AudioPlayer";
import laberintoMusico from "../assets/laberinto.mp3";
import victoriaVideo from "../assets/gatoBesando.mp4";

function Laberinto() {
    const navigate = useNavigate();
    const tamaño = 20; // Laberinto 20x20
    const rangoVision = 1; // Mayor rango de visión
  
    const laberinto = [
    [0, 1, 3, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 2],
    [0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0],
    [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 3, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0],
    [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [0, 0, 3, 1, 1, 3, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [ganado, setGanado] = useState(false);
  
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (ganado) return;
  
        let { x, y } = pos;
        
        if (e.key === "ArrowUp" && y > 0 && laberinto[y - 1][x] !== 1) y--;
        if (e.key === "ArrowDown" && y < tamaño - 1 && laberinto[y + 1][x] !== 1) y++;
        if (e.key === "ArrowLeft" && x > 0 && laberinto[y][x - 1] !== 1) x--;
        if (e.key === "ArrowRight" && x < tamaño - 1 && laberinto[y][x + 1] !== 1) x++;
  
        if (laberinto[y][x] === 3) {
          alert("⚠️ ¡Caíste en una trampa! Vuelves al inicio.");
          x = 0;
          y = 0;
        }
  
        if (laberinto[y][x] === 2) {
          setGanado(true);
        }
  
        setPos({ x, y });
      };
  
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [pos, laberinto, ganado]);
  
    return (
      <AnimatedPage>
        {ganado ? (
          <div className="video-container">
            <video autoPlay onEnded={() => navigate("/rompecabezas")}>
              <source src={victoriaVideo} type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
          </div>
        ) : (
          <div className="laberinto">
            <AudioPlayer src={laberintoMusico} />
            <p>Encuentra la salida</p>
            {laberinto.map((fila, y) => (
              <div key={y} className="fila">
                {fila.map((celda, x) => {
                  let distancia = Math.abs(pos.x - x) + Math.abs(pos.y - y);
                  let visible = distancia <= rangoVision;
  
                  let clase = "celda";
                  if (!visible) clase += " oculto";
                  if (celda === 1) clase += " pared";
                  if (celda === 2) clase += " meta";
                  if (celda === 3) clase += " trampa";
                  if (pos.x === x && pos.y === y) clase += " jugador";
  
                  return <div key={x} className={clase}></div>;
                })}
              </div>
            ))}
          </div>
        )}
      </AnimatedPage>
    );
  }
  
  export default Laberinto;