import mfinalMusic from "../assets/mfinal.mp3";
import AudioPlayer from "../componentes/AudioPlayer";
import patoytigre from "../assets/PatoYTigre.png";
import "../estilos/MFinal.css"

function MensajeFinal() {
    return (
      <div className="contenedor">
        <AudioPlayer src={mfinalMusic} />
        <h1>🎉 Lo lograste, mi amor 🎉</h1>
        <p className="texto">
          Quiero decirte lo tan especial y única que eres para mí. <br />
          Estos dos años que estuvimos juntos los aprecio mucho. <br />
          Me gusta estar contigo y seguir estando contigo. <br />
          Quiero que cumplamos muchos más años juntos y que jamás nos separemos <br />
          Te amo y te amare por siempre 💖
        </p>
        <img src={patoytigre} alt="Foto tierna" />
        <p>Gracias por ser tan especial para mí.</p>
      </div>
    );
  }
  
export default MensajeFinal;