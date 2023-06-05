import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebaseApp from '../firebase_config';

function Detalle({ agregarAlCarrito }) {

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    const [articulo, setArticulo] = useState(null);

    useEffect(() => {
      const fetchArticulo = async () => {
        try {
          const db = getFirestore(firebaseApp);
          const articuloRef = doc(db, 'articulos', id); // Suponiendo que 'id' es el ID obtenido de la URL
  
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
  
      fetchArticulo();
    }, []);

    const handleAgregarAlCarrito = () => {
      if (articulo) {
        agregarAlCarrito(articulo);
      }
    };

    return (
        <div>
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
                <button id='agregar' onClick={handleAgregarAlCarrito}>Agregar al carrito</button>
            </div>
        </div>
    );
};

export default Detalle;