import React from 'react';
import { useEffect } from 'react';
import './carrito.css'
import Cookies from 'js-cookie';
import { useNavigate  } from 'react-router-dom';

function Carrito({ carrito, setCarrito }) {

  console.log("carrito", carrito);

    const vaciarCarrito = () => {
      setCarrito([]);
    };

    // useEffect(() => {
    //   const carritoGuardado = Cookies.get('carrito');
    //   if (carritoGuardado) {
    //     setCarrito(carritoGuardado);
    //   }
    // }, []);
  
    // useEffect(() => {
    //   Cookies.set('carrito', JSON.stringify(carrito), { expires: 1 / 24 });
    // }, [carrito]);

    // useEffect(() => {
    //   const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    //   const carritoExpiracion = localStorage.getItem('carritoExpiracion');
    //   if (carritoGuardado && carritoExpiracion) {
    //     const currentTime = new Date().getTime();
    //     if (currentTime < carritoExpiracion) {
    //       setCarrito(carritoGuardado);
    //     } else {
    //       // Carrito expirado, borrar los datos
    //       localStorage.removeItem('carrito');
    //       localStorage.removeItem('carritoExpiracion');
    //     }
    //   }
    // }, []);
  
    // useEffect(() => {
    //   localStorage.setItem('carrito', JSON.stringify(carrito));
    //   // Establecer la fecha de expiración en 1 hora
    //   const expiracion = new Date().getTime() + 60 * 60 * 1000;
    //   localStorage.setItem('carritoExpiracion', expiracion);
    // }, [carrito]);
  
  
    // useEffect(() => {
    //   const actualizarCantidad = () => {
    //     const carritoActualizado = carrito.reduce((resultado, articulo) => {
    //       const existente = resultado.find((item) => item.titulo === articulo.titulo);
    //       if (existente) {
    //         // Artículo duplicado, incrementar cantidad
    //         existente.cantidad += 1;
    //       } else {
    //         // Artículo no duplicado, agregar al resultado
    //         resultado.push({ ...articulo, cantidad: 1 });
    //       }
    //       return resultado;
    //     }, []);
    //     setCarrito(carritoActualizado);
    //   };
    //   actualizarCantidad();
    // }, []);

    const navigate = useNavigate();

    const handleComprar = () => {
      navigate('/compra');
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
                <th>Cantidad</th>
                <th>Precio/Unidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((articulo, index) => (
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
                  <td>{articulo.precio * articulo.cantidad}€</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"><b>Total:</b></td>
                <td>
                  <b>
                    {carrito.reduce((total, articulo) => total + articulo.precio * articulo.cantidad, 0)}€
                  </b>
                </td>
              </tr>
            </tfoot>
          </table>
        )}
        <button onClick={handleComprar}>Comprar</button>
        <button onClick={vaciarCarrito}>Vaciar carrito</button>
      </div>
    );
}

export default Carrito;