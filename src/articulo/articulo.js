import React from 'react';
import { Link } from 'react-router-dom';

function Articulo({ articulo }) {

    // console.log(articulo);

    return (
        <div>
            <Link to={`/detalle?id=${articulo.id}`}>
                <h2>{articulo.titulo}</h2>
                <p>{articulo.genero}</p>
                <p>{articulo.precio}</p>
                <p>{articulo.autor}</p>
                <img src={articulo.imagen} alt="Imagen del artículo" />
                {/* <input id='product_id' type='hidden' value={ articulo.id }/> */}
            </Link>
        </div>
    );
}

export default Articulo;