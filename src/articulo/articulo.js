import React from 'react';
import { Link } from 'react-router-dom';
import './articulo.css';

function Articulo({ articulo }) {

    // console.log(articulo);

    return (
        <div class='articulo'>
            <Link to={`/detalle?id=${articulo.id}`} className='link-no-underline'>
                <h4>{articulo.titulo}</h4>
                <img src={articulo.imagen} alt="Imagen del artículo" />
                <p>{articulo.precio}</p>
                <p>{articulo.autor}</p>
                {/* <input id='product_id' type='hidden' value={ articulo.id }/> */}
            </Link>
        </div>
    );
}

export default Articulo;