import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebase_config';
import Articulo from '../articulo/articulo';
import './novedades.css';

// Componente Novedades

function Novedades(){

    const [novedades, setNovedades] = useState([]);

    useEffect(() => {
        const fetchNovedades = async () => {
          try {
            const db = getFirestore(firebaseApp);
            const articulosRef = collection(db, 'articulos');
            const q = query(articulosRef, orderBy('fecha', 'desc'), limit(5)); // Obtener los 5 artículos más recientes por fecha
    
            const querySnapshot = await getDocs(q);
            const novedadesData = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              });
            setNovedades(novedadesData);
          } catch (error) {
            console.error('Error al obtener las novedades:', error);
          }
        };
    
        fetchNovedades();
      }, []);
  
    return (
        <div id='novedades'>
            <h2>Novedades</h2>
            {novedades.length === 0 ? (
                <p>No hay novedades disponibles</p>
            ) : (
            <ul>
                {novedades.map((novedad) => (
                    <li key={novedad.id}>
                        <Articulo id='art' articulo = {novedad}/>
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
};

export default Novedades;