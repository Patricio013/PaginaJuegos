import puzzle from "../../assets/rompecabezas.png";
import "../../estilos/RompecabezasPC.css";

function RompecabezasPC({ piezas, gridSize, swapPiezas }) {
    return (
      <div className="rompecabezas-pc" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {piezas.map((pos, index) => (
          <div
            key={index}
            className="pieza-pc"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const fromIndex = e.dataTransfer.getData("text/plain");
              swapPiezas(fromIndex, index);
            }}
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
  
  export default RompecabezasPC;