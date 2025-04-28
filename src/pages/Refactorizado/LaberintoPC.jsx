import "../../estilos/LaberintoPC.css";

function LaberintoPC({ laberinto, pos, rangoVision }) {
    return (
      <div className="laberinto-pc">
        <h2>Encuentra la salida</h2>
        {laberinto.map((fila, y) => (
          <div key={y} className="fila-pc">
            {fila.map((celda, x) => {
              let distancia = Math.abs(pos.x - x) + Math.abs(pos.y - y);
              let visible = distancia <= rangoVision;
  
              let clase = "celda-pc";
              if (!visible) clase += " oculto-pc";
              if (celda === 1) clase += " pared-pc";
              if (celda === 2) clase += " meta-pc";
              if (celda === 3) clase += " trampa-pc";
              if (pos.x === x && pos.y === y) clase += " jugador-pc";
  
              return <div key={x} className={clase}></div>;
            })}
          </div>
        ))}
      </div>
    );
  }
  
  export default LaberintoPC;