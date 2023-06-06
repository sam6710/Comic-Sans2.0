import React, { useEffect, useState } from 'react';
import './carrusel.css';

function Carrusel() {
  const TIEMPO_INTERVALO_MILESIMAS_SEG = 4000;

  const IMAGENES = [
    "./imagenes/norma.jpg",
    "./imagenes/marvel.jpg",
    "./imagenes/dc.jpg",
  ];

  // let posicionActual = 0;
  // let intervaloRef = useRef(null);
  const [posicionActual, setPosicionActual] = useState(0);

  // const pasarFoto = () => {
  //   if (posicionActual >= IMAGENES.length - 1) {
  //     posicionActual = 0;
  //   } else {
  //     posicionActual++;
  //   }
  //   renderizarImagen();
  // };
  const pasarFoto = () => {
    setPosicionActual((prevPosicion) => (prevPosicion + 1) % IMAGENES.length);
  };

  // const renderizarImagen = () => {
  //   const img_carrusel = document.getElementById("imagen_carrusel");
  //   img_carrusel.src = IMAGENES[posicionActual];
  // };

  useEffect(() => {
    const intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  // const playIntervalo = () => {
  //   setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
  // };

  // useEffect(() => {
  //   playIntervalo();
  // }, []);

  return (
    // <section id="carrusel">
    //   <div id="img_carrusel">
    //     <img src="./imagenes/norma.jpg" alt="imagen_carrusel" id="imagen_carrusel" />
    //   </div>
    // </section>
    <section id="carrusel">
      <div id="img_carrusel">
        <img src={IMAGENES[posicionActual]} alt="imagen_carrusel" id="imagen_carrusel" />
      </div>
    </section>
  );
}

export default Carrusel;