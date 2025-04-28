import puzzle from "../../assets/rompecabezas.png";
import "../../estilos/RompecabezasMobile.css";

function RompecabezasMobile({ piezas, gridSize, swapPiezas }) {
    let touchStartIndex = null;
    let touchTarget = null;

    const handleTouchStart = (index, event) => {
      touchStartIndex = index;
      touchTarget = event.target;
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
      const touch = event.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element && element.classList.contains('pieza-mobile')) {
        touchTarget = element;
      }
    };

    const handleTouchEnd = () => {
      if (touchStartIndex !== null && touchTarget) {
        const toIndex = Number(touchTarget.getAttribute('data-index'));
        if (!isNaN(toIndex) && toIndex !== touchStartIndex) {
          swapPiezas(touchStartIndex, toIndex);
        }
      }
      touchStartIndex = null;
      touchTarget = null;
    };

    return (
      <div className="rompecabezas-mobile" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }} onTouchMove={handleTouchMove}>
        {piezas.map((pos, index) => (
          <div
            key={index}
            className="pieza-mobile"
            data-index={index}
            draggable
            onTouchStart={(e) => handleTouchStart(index, e)}
            onTouchEnd={handleTouchEnd}
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