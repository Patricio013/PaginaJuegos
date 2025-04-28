import "../../estilos/LaberintoMobile.css";

function LaberintoMobile({ laberinto, pos, rangoVision, mover }) {
    return (
      <div className="laberinto-mobile">
        <h2 className="titulo-mobile">Encuentra la salida</h2>
        <div className="laberinto">
          {laberinto.map((fila, yFila) => (
            <div key={yFila} className="fila">
              {fila.map((celda, xCol) => {
                let distancia = Math.abs(pos.x - xCol) + Math.abs(pos.y - yFila);
                let visible = distancia <= rangoVision;
  
                let clase = "celda";
                if (!visible) clase += " oculto";
                if (celda === 1) clase += " pared";
                if (celda === 2) clase += " meta";
                if (celda === 3) clase += " trampa";
                if (pos.x === xCol && pos.y === yFila) clase += " jugador";
  
                return <div key={xCol} className={clase}></div>;
              })}
            </div>
          ))}
        </div>
        <div className="controles">
          <button onClick={() => mover("arriba")}>⬆️</button>
          <div>
            <button onClick={() => mover("izquierda")}>⬅️</button>
            <button onClick={() => mover("abajo")}>⬇️</button>
            <button onClick={() => mover("derecha")}>➡️</button>
          </div>
        </div>
      </div>
    );
}

export default LaberintoMobile;
  