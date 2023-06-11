import React, { useEffect, useState } from 'react';
import './carrusel.css';

// Componente Carrusel

function Carrusel() {
  const TIEMPO_INTERVALO_MILESIMAS_SEG = 4000;

  // Imágenes del carrusel
  const IMAGENES = [
    "./imagenes/comic.jpg",
    "./imagenes/marvel.jpg",
    "./imagenes/dc.jpg",
    "./imagenes/manga.jpg",
    "./imagenes/Manga-cartel.jpg",
    "./imagenes/jump.jpg",
    "./imagenes/panda.jpg",
  ];

  const [posicionActual, setPosicionActual] = useState(0);

  const pasarFoto = () => {
    setPosicionActual((prevPosicion) => (prevPosicion + 1) % IMAGENES.length);
  };

  useEffect(() => {
    const intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  return (
    <section id="carrusel">
      <div id="img_carrusel">
        <img src={IMAGENES[posicionActual]} alt="imagen_carrusel" id="imagen_carrusel" />
      </div>
    </section>
  );
}

export default Carrusel;