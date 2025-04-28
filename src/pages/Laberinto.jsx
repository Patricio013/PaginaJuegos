import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/Laberinto.css";
import AnimatedPage from "../componentes/AnimatedPage";
import AudioPlayer from "../componentes/AudioPlayer";
import laberintoMusico from "../assets/laberinto.mp3";
import victoriaVideo from "../assets/Felicidades.mp4";
import LaberintoPC from "./Refactorizado/LaberintoPC";
import LaberintoMobile from "./Refactorizado/LaberintoMobile";

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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    const mover = (direccion) => {
      let { x, y } = pos;
  
      if (direccion === "arriba" && y > 0 && laberinto[y - 1][x] !== 1) y--;
      if (direccion === "abajo"  && y < tamaño - 1 && laberinto[y + 1][x] !== 1) y++;
      if (direccion === "izquierda" && x > 0 && laberinto[y][x - 1] !== 1) x--;
      if (direccion === "derecha" && x < tamaño - 1 && laberinto[y][x + 1] !== 1) x++;
  
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
  
    useEffect(() => {
      if (isMobile || ganado) return;
  
      const onKeyDown = (e) => {
        switch (e.key) {
          case "ArrowUp":    mover("arriba");    break;
          case "ArrowDown":  mover("abajo");     break;
          case "ArrowLeft":  mover("izquierda"); break;
          case "ArrowRight": mover("derecha");   break;
        }
      };
  
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [pos, isMobile, ganado]);
  
  
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
          <>
            <AudioPlayer src={laberintoMusico} />
            {isMobile ? (
              <LaberintoMobile
                laberinto={laberinto}
                pos={pos}
                rangoVision={rangoVision}
                mover={mover}
              />
            ) : (
              <LaberintoPC
                laberinto={laberinto}
                pos={pos}
                rangoVision={rangoVision}
                mover={mover}
              />
            )}
          </>
        )}
      </AnimatedPage>
    );
  }
  
  export default Laberinto;