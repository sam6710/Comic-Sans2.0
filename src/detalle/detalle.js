import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import firebaseApp from '../firebase_config';
import { useNavigate  } from 'react-router-dom';
import Modal from 'react-modal';
import './detalle.css';

Modal.setAppElement('#root');

function Detalle({ user, agregarAlCarrito }) {

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    const [articulo, setArticulo] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [carrito, setCarrito] = useState([]);

    const navigate  = useNavigate ();

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

    const agregarAlCarritoo = () => {
      agregarAlCarrito(articulo);
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
              <button id='agregar' onClick={agregarAlCarritoo}>Agregar al carrito</button>
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