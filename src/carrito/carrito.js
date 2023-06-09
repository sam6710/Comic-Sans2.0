import React from 'react';
import './carrito.css'
import { useNavigate  } from 'react-router-dom';

function Carrito({ carrito, setCarrito }) {

  console.log("carrito", carrito);

    const vaciarCarrito = () => {
      setCarrito([]);
    };

    const carritoCantidad = carrito.map((articulo) => {
      return {
        ...articulo,
        cantidadTotal: 1
      };
    });

    const carritoAgrupado = carritoCantidad.reduce((resultado, articulo) => {
      const existente = resultado.find((item) => item.titulo === articulo.titulo);
      if (existente) {
        existente.cantidad += 1;
      } else {
        resultado.push({ ...articulo, cantidad: 1 });
      }
      return resultado;
    }, []);

    const navigate = useNavigate();

    const handleComprar = () => {
      navigate('/compra');
    };

    const totalPedido = carrito.reduce((total, articulo) => {
      const precio = parseFloat(articulo.precio.replace(',', '.'));
      const cantidad = articulo.cantidad || 1;
      return total + (precio * cantidad);
    }, 0);

    return (
      <div id='carrito'>
        <h2>Carrito de compras</h2>
        {carrito.length === 0 ? (
          <p>No hay artículos en el carrito</p>
        ) : (
          <table>
            <thead>
              <tr id='tr_principal'>
                <th id='th_articulo'>Artículo</th>
                <th>Cantidad</th>
                <th>Precio/Unidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {carritoAgrupado.map((articulo, index) => (
                <tr key={index} id='tr_articulo'>
                  <td id='td_articulo'>
                    <div id='div_imagen'>
                      <img src={articulo.imagen} alt="Imagen del artículo" />
                    </div>
                    <div id='datos1'>
                      <p>Título: {articulo.titulo}</p>
                      <p>Editorial: {articulo.editorial}</p>
                      <p>Autor: {articulo.autor}</p>
                    </div>
                  </td>
                  <td>{articulo.cantidad}</td>
                  <td>{articulo.precio}€</td>
                  <td>{(parseFloat(articulo.precio.replace(',' , '.')) * articulo.cantidad).toFixed(2)}€</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"><b>Total:</b></td>
                <td>
                  <b>
                  {totalPedido.toFixed(2)}€
                  </b>
                </td>
              </tr>
            </tfoot>
          </table>
        )}
        {carrito.length !== 0 && (
          <div id='botonesCompra'>
            <button className="btn btn-dark" onClick={handleComprar}>Comprar</button>
            <button className="btn btn-dark" id='vaciar' onClick={vaciarCarrito}>Vaciar carrito</button>
          </div>
        )}
      </div>
    );
}

export default Carrito;