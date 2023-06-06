import React from 'react';

function Carrito({ carrito }) {

  console.log("carrito", carrito);

    return (
      <div>
        <h2>Carrito de compras</h2>
        {carrito.length === 0 ? (
          <p>No hay artículos en el carrito</p>
        ) : (
          <ul>
            {carrito.map((articulo, index) => (
              <li key={index}>{articulo.titulo}</li>
            ))}
          </ul>
        )}
      </div>
    );
}

export default Carrito;