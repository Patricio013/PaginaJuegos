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
    { pregunta: "¿En qué país se encuentra la Gran Muralla China?", respuesta: "china" },
    { pregunta: "¿Cuál es color que se forma cuando se mezcla azul y amarillo?", respuesta: "verde" },
    { pregunta: "¿Cuál es el país más grande del mundo en superficie?", respuesta: "rusia" },
    { pregunta: "¿Como esta compuesto el agua?", respuesta: "H2O" },
    { pregunta: "¿Cuál es el metal más abundante en la corteza terrestre?", respuesta: "aluminio" },
    { pregunta: "¿Cuál es el mejor amigo del hombre?", respuesta: "perro" },
    { pregunta: "¿Cuántos continentes hay en la Tierra?", respuesta: "7" },
    { pregunta: "¿Cuántos huesos tiene el cuerpo humano adulto?", respuesta: "206" },
    { pregunta: "¿Quien hizo la Mona Lisa?", respuesta: "leonardo da vinci" }
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