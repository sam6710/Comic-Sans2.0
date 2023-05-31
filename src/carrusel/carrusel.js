import React, { useEffect } from 'react';

function Carrusel() {
  const TIEMPO_INTERVALO_MILESIMAS_SEG = 4000;

  const IMAGENES = [
    "./imagenes/norma.jpg",
    "./imagenes/marvel.jpg",
    "./imagenes/dc.jpg",
  ];

  let posicionActual = 0;

  const pasarFoto = () => {
    if (posicionActual >= IMAGENES.length - 1) {
      posicionActual = 0;
    } else {
      posicionActual++;
    }
    renderizarImagen();
  };

  const renderizarImagen = () => {
    const img_carrusel = document.getElementById("imagen_carrusel");
    img_carrusel.src = IMAGENES[posicionActual];
  };

  const playIntervalo = () => {
    setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
  };

  useEffect(() => {
    playIntervalo();
  }, []);

  return (
    <section id="carrusel">
      <div id="img_carrusel">
        <img src="./imagenes/norma.jpg" alt="imagen_carrusel" id="imagen_carrusel" />
      </div>
    </section>
  );
}

export default Carrusel;