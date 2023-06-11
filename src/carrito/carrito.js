import React from 'react';
import './carrito.css'
import { useNavigate  } from 'react-router-dom';

// Componente Carrito

function Carrito({ carrito, setCarrito, user }) {

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
      if (user) {
        navigate('/compra');
      } else {
        navigate('/login');
      }
    };

    // Calculo total del pedido
    const totalPedido = carrito.reduce((total, articulo) => {
      const precio = parseFloat(articulo.precio.replace(',', '.'));
      const cantidad = articulo.cantidad || 1;
      return total + (precio * cantidad);
    }, 0);

    const eliminarArticulo = (articuloId) => {
      const nuevoCarrito = carrito.filter((articulo) => articulo.titulo !== articuloId);
      setCarrito(nuevoCarrito);
    };

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
                <th id='th_cantidad'>Cantidad</th>
                <th id='th_precio-u'>Precio/Unidad</th>
                <th id='th_precio'>Precio</th>
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
                      <p id='p_titulo'>Título: {articulo.titulo}</p>
                      <p id='p_editorial'>Editorial: {articulo.editorial}</p>
                      <p id='p_autor'>Autor: {articulo.autor}</p>
                    </div>
                  </td>
                  <td id='td_cantidad'>{articulo.cantidad}<button id="eliminar" onClick={() => eliminarArticulo(articulo.titulo)}>Eliminar</button></td>
                  <td id='td_precio-u'>{articulo.precio}€</td>
                  <td id='td_precio'>{(parseFloat(articulo.precio.replace(',' , '.')) * articulo.cantidad).toFixed(2)}€</td>
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