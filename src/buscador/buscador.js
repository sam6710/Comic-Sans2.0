import React,  { useState } from 'react';
import './buscador.css';
import { getFirestore, collection, query, getDocs, where, or } from 'firebase/firestore';
import firebaseApp from '../firebase_config';
import { useNavigate  } from 'react-router-dom';

function Buscador() {

    const [searchValue, setSearchValue] = useState('');

    const navigate  = useNavigate ();

    const handleInputChange = (event) => {
      setSearchValue(event.target.value);
    };
  
    const handleSearch = (event) => {
      if (event.key === 'Enter') {
        // Aquí puedes realizar la lógica de búsqueda utilizando el valor de "searchValue"
        console.log(searchValue);
        fetchBusqueda(searchValue);
        // navigate('/galeria?busqueda=${searchValue}');
      }
    };

    const fetchBusqueda = async (search) => {
        try {
            const db = getFirestore(firebaseApp);
            const articulosRef = collection(db, 'articulos');

            const queryTitulo = query(articulosRef, where('titulo', '>=', search), where('titulo', '<=', search + '\uf8ff'));
            const queryAutor = query(articulosRef, where('autor', '>=', search), where('autor', '<=', search + '\uf8ff'));

            const [snapshotTitulo, snapshotAutor] = await Promise.all([getDocs(queryTitulo), getDocs(queryAutor)]);

            const results = [];
                snapshotTitulo.forEach((doc) => {
                console.log('Documento encontrado (título):', doc.id, doc.data());
                results.push(doc.data());
            });
                snapshotAutor.forEach((doc) => {
                console.log('Documento encontrado (autor):', doc.id, doc.data());
                results.push(doc.data());
            });
            console.log("Awakate", results);

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