import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import firebaseApp from '../firebase_config';
import { useNavigate  } from 'react-router-dom';
import Modal from 'react-modal';
import './detalle.css';

Modal.setAppElement('#root');

function Detalle({ carrito, user }) {

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    const [articulo, setArticulo] = useState(null);
    const [detalleCarrito, setDetalleCarrito] = useState(carrito);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const navigate  = useNavigate ();

  const agregarAlCarrito = (articulo) => {
    setDetalleCarrito((prevCarrito) => [...prevCarrito, articulo]);
    // console.log("detallecarrito", detallecarrito);
    // console.log("carrito", carrito);
    // console.log("articulo", articulo);
  };

  const agregarArticuloAlCarrito = () => {
    agregarAlCarrito(articulo);
    // console.log("Articulo", articulo);
  };

    useEffect(() => {
      const fetchArticulo = async () => {
        try {
          const db = getFirestore(firebaseApp);
          const articuloRef = doc(db, 'articulos', id);
  
          const docSnapshot = await getDoc(articuloRef);
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setArticulo(data);
          } else {
            console.log('El artículo no existe');
          }
        } catch (error) {
          console.error('Error al obtener el artículo:', error);
        }
      };
  
      console.log("usuario", user);
      fetchArticulo();
    }, []);

    useEffect(() => {
      console.log('detalleCarrito:', detalleCarrito);
      console.log('carrito:', carrito);
    }, [detalleCarrito, carrito]);

    // const handleAgregarAlCarrito = () => {
    //   if (articulo) {
    //     agregarAlCarrito(articulo);
    //   }
    // };

    const borrarArticulo = async () => {
      openModal();
    };

    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };

    const confirmarBorrado = async () => {
      try {
        const db = getFirestore(firebaseApp);
        await deleteDoc(doc(db, 'articulos', id));
        console.log('Artículo eliminado');
        navigate('/');
      } catch (error) {
        console.error('Error al eliminar el artículo:', error);
      }
    };

    return (
        <div id='detalle'>
          <div id='imagen'>
              <img src={articulo && articulo.imagen} alt="Imagen del artículo" />
          </div>
          <div id='info'>
              <h2>{articulo && articulo.titulo}</h2>
              <p>{articulo && articulo.editorial}</p>
              <p>{articulo && articulo.genero}</p>
              <p>{articulo && articulo.genero2}</p>
              <p>{articulo && articulo.precio}</p>
              <p>{articulo && articulo.año}</p>
              <p>{articulo && articulo.autor}</p>
          </div>
          <div id='acciones'>
              <button id='agregar' onClick={agregarArticuloAlCarrito}>Agregar al carrito</button>
              {/* onClick={handleAgregarAlCarrito} */}
              {user && user.rol === "admin" && (
                  <button id='borrar' onClick={borrarArticulo}>Borrar</button>
              )}
          </div>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Confirmar Borrado">
            <h2>Confirmar Borrado</h2>
            <p>¿Estás seguro de que deseas borrar este artículo?</p>
            <div>
              <button onClick={confirmarBorrado}>Sí, Borrar</button>
              <button onClick={closeModal}>Cancelar</button>
            </div>
          </Modal>
        </div>
    );
};

export default Detalle;