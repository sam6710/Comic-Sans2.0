import React from 'react';
import { Link } from 'react-router-dom';
import './articulo.css';

// Componente Artículo

function Articulo({ articulo }) {

    return (
        <div className='articulo'>
            <Link to={`/detalle?id=${articulo.id}`} className='link-no-underline'>
                <h4>{articulo.titulo}</h4>
                <img src={articulo.imagen} alt="Imagen del artículo" />
                <p>{articulo.precio}€</p>
                <p>{articulo.autor}</p>
            </Link>
        </div>
    );
}

export default Articulo;