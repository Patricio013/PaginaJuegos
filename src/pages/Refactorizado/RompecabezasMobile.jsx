import puzzle from "../../assets/rompecabezas.png";
import "../../estilos/RompecabezasMobile.css";
import { useState } from "react";

function RompecabezasMobile({ piezas, gridSize, swapPiezas }) {
    const [lastTouched, setLastTouched] = useState(null);

    const handleTouch = (index) => {
      if (lastTouched === null) {
        setLastTouched(index);
      } else {
        if (lastTouched !== index) {
          swapPiezas(lastTouched, index);
        }
        setLastTouched(null);
      }
    };

    return (
      <div className="rompecabezas-mobile" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {piezas.map((pos, index) => (
          <div
            key={index}
            className="pieza-mobile"
            data-index={index}
            onTouchEnd={() => handleTouch(index)}
            style={{
            backgroundImage: `url(${puzzle})`,
            backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
            backgroundPosition: `${(pos % gridSize) * (100 / (gridSize - 1))}% ${(Math.floor(pos / gridSize)) * (100 / (gridSize - 1))}%`
            }}
          />
        ))}
      </div>
    );
  }
  
  export default RompecabezasMobile;