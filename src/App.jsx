import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Preguntas from "./pages/Preguntas";
import JuegoMemoria from "./pages/JuegoMemoria";
import Laberinto from "./pages/Laberinto";
import Rompecabezas from "./pages/Rompecabezas";
import MensajeFinal from "./pages/MFinal";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    const rutasFondos = {
      "/": "fondo-inicio",
      "/preguntas": "fondo-preguntas",
      "/memoria": "fondo-memoria",
      "/rompecabezas": "fondo-rompecabezas",
      "/laberinto": "fondo-laberinto",
      "/final": "fondo-final"
    };
    
    document.body.className = rutasFondos[location.pathname] || "";
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Inicio />} />
        <Route path="/preguntas" element={<Preguntas />} />
        <Route path="/memoria" element={<JuegoMemoria />} />
        <Route path="/laberinto" element={<Laberinto />} />
        <Route path="/rompecabezas" element={<Rompecabezas />} />
        <Route path="/final" element={<MensajeFinal />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}

export default App
