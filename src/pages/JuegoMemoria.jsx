import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/Memoria.css";
import memoriaMusic from "../assets/memoria.mp3";
import AudioPlayer from "../componentes/AudioPlayer";
import AnimatedPage from "../componentes/AnimatedPage"

const cartas = [
  { emoji: "❤️", id: 1 },
  { emoji: "🌹", id: 2 },
  { emoji: "🐱", id: 3 },
  { emoji: "🎮", id: 4 },
  { emoji: "🐶", id: 5 },
  { emoji: "💏", id: 6 },
  { emoji: "🦆", id: 7 },
  { emoji: "🐯", id: 8 }, 
  { emoji: "❤️", id: 1 },
  { emoji: "🌹", id: 2 },
  { emoji: "🐱", id: 3 },
  { emoji: "🎮", id: 4 },
  { emoji: "🐶", id: 5 },
  { emoji: "💏", id: 6 },
  { emoji: "🦆", id: 7 },
  { emoji: "🐯", id: 8 },
];

function Memoria() {
  const navigate = useNavigate();
  const [baraja, setBaraja] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [cartasAdivinadas, setCartasAdivinadas] = useState([]);

  useEffect(() => {
    setBaraja(cartas.sort(() => Math.random() - 0.5));
  }, []);

  const handleClick = (index) => {
    if (seleccionadas.length === 2) return;

    setSeleccionadas((prev) => [...prev, index]);

    if (seleccionadas.length === 1) {
      const [primeraCarta] = seleccionadas;

      if (baraja[primeraCarta].id === baraja[index].id) {
        setCartasAdivinadas([...cartasAdivinadas, baraja[index].id]);
      }

      setTimeout(() => setSeleccionadas([]), 1000);
    }
  };

  useEffect(() => {
    if (cartasAdivinadas.length === 8) {
      setTimeout(() => {
        alert("🎉 ¡Bien hecho jugador! Ahora que ya entrenamos la memoria, nos toca aventurarnos en sitios desconocidos 🎉");
        navigate("/laberinto");
      }, 800);
    }
  }, [cartasAdivinadas]);

  return (
    <AnimatedPage>
      <div className="memoria">
        <AudioPlayer src={memoriaMusic} />
        {baraja.map((carta, index) => (
          <div
            key={index}
            className={`carta ${seleccionadas.includes(index) || cartasAdivinadas.includes(carta.id) ? "volteada" : ""}`}
            onClick={() => handleClick(index)}
          >
            {seleccionadas.includes(index) || cartasAdivinadas.includes(carta.id) ? carta.emoji : "❓"}
          </div>
        ))}
      </div>
    </AnimatedPage>
  );
}

export default Memoria;