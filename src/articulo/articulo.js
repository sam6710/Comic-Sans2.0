import React from 'react';

function Articulo({ articulo }) {

    // console.log(articulo);

    return (
        <div>
            <h2>{articulo.titulo}</h2>
            <p>{articulo.editorial}</p>
            <p>{articulo.genero}</p>
            <p>{articulo.genero2}</p>
            <p>{articulo.precio}</p>
            <p>{articulo.año}</p>
            <p>{articulo.autor}</p>
            <img src={articulo.imagen} alt="Imagen del artículo" />
        </div>
    );
}

export default Articulo;