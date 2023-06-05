import React from 'react';

function Carrito(props) {

    const { carrito } = props;

    console.log("carrito", carrito);

    return (
        <div>
        <h2>Carrito de compras</h2>
        {carrito.length === 0 ? (
          <p>No hay artículos en el carrito</p>
        ) : (
          <ul>
            {carrito.map((articulo) => (
              <li key={articulo.id}>
                <h3>{articulo.titulo}</h3>
                <p>Precio: {articulo.precio}</p>
                {/* Aquí puedes agregar más detalles del artículo en el carrito */}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}

export default Carrito;