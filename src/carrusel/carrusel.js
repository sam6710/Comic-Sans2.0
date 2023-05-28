import React, { useEffect } from 'react';

function Carrusel() {
  const TIEMPO_INTERVALO_MILESIMAS_SEG = 4000;

  const IMAGENES = [
    "../../public/imagenes/marvel.jpg",
    "../../assets/imagenes/3.jpg",
    "../../assets/imagenes/4.jpg",
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
    montarInicio();
    playIntervalo();
  }, []);

  const montarInicio = () => {
    // Código para montar el inicio
  };

  return (
    <section id="carrusel">
      <div id="img_carrusel">
        <img src="../../public/imagenes/norma.jpg" alt="imagen_carrusel" id="imagen_carrusel" />
      </div>
    </section>
  );
}

export default Carrusel;