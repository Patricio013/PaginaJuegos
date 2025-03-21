import { useState } from "react";
import { useNavigate } from "react-router-dom";
import preguntasMusic from "../assets/preguntas.mp3";
import AudioPlayer from "../componentes/AudioPlayer";
import Correcto from "../assets/correcto.mp3";
import Incorrecto from "../assets/incorrecto.mp3";
import "../estilos/Preguntar.css";
import AnimatedPage from "../componentes/AnimatedPage"

function Preguntas() {
  const navigate = useNavigate();

  const preguntas = [
    { pregunta: "❓ ¿En qué año nos conocimos?", respuesta: "2022" },
    { pregunta: "💖 ¿Cuál es nuestro color favorito?", respuesta: "verde" },
    { pregunta: "👪 ¿Cuál fue nuestro primer hijo virtual?", respuesta: "kiwii" },
    { pregunta: "💭 ¿Hace cuantos años estamos saliendo?", respuesta: "2" },
    { pregunta: "🧉 ¿Cuál es la comida que más me gusta?", respuesta: "tostados" },
    { pregunta: "🐕 ¿Como se llamaba mi primera mascota?", respuesta: "blanqui" },
    { pregunta: "💍 ¿Te casarias conmigo?", respuesta: "acepto" },
    { pregunta: "🥰 ¿Me amas?", respuesta: "te amo" },
    { pregunta: "💑 ¿Por siempre?", respuesta: "para siempre" }
  ];

  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState("");
  const [animacion, setAnimacion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (respuesta.toLowerCase().trim() === preguntas[indice].respuesta.toLowerCase()) {
      new Audio(Correcto).play();
      setAnimacion("correcto");
      setTimeout(() => {
        setAnimacion("");
        if (indice + 1 < preguntas.length) {
          setIndice(indice + 1);
          setRespuesta("");
        } else {
          navigate("/memoria");
        }
      }, 1000);
    } else {
      new Audio(Incorrecto).play();
      setAnimacion("incorrecto");
      setTimeout(() => setAnimacion(""), 1000);
    }
  };

  return (
    <AnimatedPage>
      <div className={`preguntas-container ${animacion}`}>
        <AudioPlayer src={preguntasMusic} />
        <h1>{preguntas[indice].pregunta}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Escribe tu respuesta"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </AnimatedPage>
  );
}

export default Preguntas;