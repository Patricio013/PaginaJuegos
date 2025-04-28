import puzzle from "../../assets/rompecabezas.png";
import "../../estilos/RompecabezasMobile.css";

function RompecabezasMobile({ piezas, gridSize, swapPiezas }) {
    let touchStartIndex = null;

    const handleTouchStart = (index) => {
        touchStartIndex = index;
    };

    const handleTouchEnd = (index) => {
        if (touchStartIndex !== null && touchStartIndex !== index) {
        swapPiezas(touchStartIndex, index);
        }
        touchStartIndex = null;
    };

    return (
      <div className="rompecabezas-mobile" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {piezas.map((pos, index) => (
          <div
            key={index}
            className="pieza-mobile"
            draggable
            onTouchStart={() => handleTouchStart(index)}
            onTouchEnd={() => handleTouchEnd(index)}
            style={{
              backgroundImage: `url(${puzzle})`,
              backgroundSize: `${gridSize * 100}px ${gridSize * 100}px`,
              backgroundPosition: `${-(pos % gridSize) * 100}px ${-Math.floor(pos / gridSize) * 100}px`,
            }}
          />
        ))}
      </div>
    );
  }
  
  export default RompecabezasMobile;