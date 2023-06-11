import React,  { useState } from 'react';
import './buscador.css';
import { getFirestore, collection, query, getDocs, where } from 'firebase/firestore';
import firebaseApp from '../firebase_config';
import { useNavigate  } from 'react-router-dom';

// Componente Buscador

function Buscador() {

    const [searchValue, setSearchValue] = useState('');

    const navigate  = useNavigate ();

    const handleInputChange = (event) => {
      setSearchValue(event.target.value);
    };
  
    const handleSearch = (event) => {
      if (event.key === 'Enter') {
        fetchBusqueda(searchValue);
      }
    };

    // Busqueda en la base de datos con el valor del Buscador
    const fetchBusqueda = async (search) => {
        try {
            const db = getFirestore(firebaseApp);
            const articulosRef = collection(db, 'articulos');

            const queryTitulo = query(articulosRef, where('titulo', '>=', search), where('titulo', '<=', search + '\uf8ff'));
            const queryAutor = query(articulosRef, where('autor', '>=', search), where('autor', '<=', search + '\uf8ff'));

            const [snapshotTitulo, snapshotAutor] = await Promise.all([getDocs(queryTitulo), getDocs(queryAutor)]);

            const results = [];
                snapshotTitulo.forEach((doc) => {
                results.push(doc.data());
            });
                snapshotAutor.forEach((doc) => {
                results.push(doc.data());
            });

            const encodedParam = encodeURIComponent(JSON.stringify(results));

            navigate(`/galeria?busqueda=${encodedParam}`);
        } catch (error) {
            console.error('Error al obtener la busqueda:', error);
        }
      };

    return(
        <li id='li-buscador' className="nav-item">
            <input id='buscador' type='text' placeholder='Buscar...' value={searchValue} onChange={handleInputChange} onKeyDown={handleSearch}/>
        </li>
    );
};

export default Buscador;