import { Link } from "react-router-dom";
import AnimatedPage from "../componentes/AnimatedPage"
import "../estilos/Inicio.css"

function Inicio() {
  return (
    <AnimatedPage>
      <div className="container">
        <h1>✨ Bienvenida, mi amor ✨</h1>
        <p>Tendrás que resolver algunos acertijos para desbloquear mi mensaje secreto. 💖</p>
        <Link to="/preguntas">Comenzar</Link>
      </div>
    </AnimatedPage>
  );
}

export default Inicio;