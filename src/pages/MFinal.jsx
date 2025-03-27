import mfinalMusic from "../assets/mfinal.mp3";
import AudioPlayer from "../componentes/AudioPlayer";
import "../estilos/MFinal.css"

function MensajeFinal() {
    return (
      <div className="contenedor">
        <AudioPlayer src={mfinalMusic} />
        <h1>🎉 Lo lograste, pasaste todos los juegos 🎉</h1>
        <p className="texto">
          Felicitaciones jugador, eres lo bastante habil para llegar hasta aqui. <br />
          No te preocupes, en un futuro lejano te traere juegos más dificiles. <br />
          Espero que estes preparado para ese entonces.
        </p>
      </div>
    );
  }
  
export default MensajeFinal;