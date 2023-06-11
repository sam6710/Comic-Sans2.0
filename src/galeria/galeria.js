import React, { useState, useEffect } from 'react';
import firebaseApp from '../firebase_config';
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore"
import Articulo from '../articulo/articulo';
import './galeria.css';
import { useLocation } from 'react-router-dom';

// Componente Galería

function Galeria() {

    const [articles, setArticles] = useState([]);

    const location = useLocation();

    useEffect(() => {
      const url = new URL(window.location.href);
      const busqueda = url.searchParams.get('busqueda');

      if (busqueda) {
        const decodedBusqueda = JSON.parse(decodeURIComponent(busqueda));
        const articlesData = decodedBusqueda.map((article) => ({
          id: article.titulo,
          ...article,
        }));

        const articlesFormatted = articlesData.map((article) => {
          const parts = article.imagen.split("/imagenes_productos/");
          const newImagen = `${parts[0]}/imagenes_productos%2F${parts[1]}`;
          return {
            ...article,
            imagen: newImagen,
          };
        });

        setArticles(articlesFormatted);
      } else {
        const fetchData = async () => {
          try {
            const db = getFirestore(firebaseApp);
            let querySnapshot;
            let querySnapshot2;

            const tipo = url.searchParams.get('tipo');
            const genero = url.searchParams.get('genero');
            const editorial = url.searchParams.get('editorial');

            if (tipo) {
              console.log("tipo", tipo);
              querySnapshot = await getDocs(
                query(collection(db, 'articulos'), where('tipo', '==', tipo))
              );
            } else if (genero) {
              console.log("genero", genero);
              querySnapshot = await getDocs(
                query(collection(db, 'articulos'), where('genero', '==', genero))
              );
              querySnapshot2 = await getDocs(
                query(collection(db, 'articulos'), where('genero2', '==', genero))
              );
            } else if (editorial) {
              console.log("editorial", editorial);
              querySnapshot = await getDocs(
                query(collection(db, 'articulos'), where('editorial', '==', editorial))
              );
              console.log("querySnapshot", querySnapshot);
            } else {
              querySnapshot = await getDocs(collection(db, 'articulos'));
            }

            const articlesData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("articlesData", articlesData);

            if(querySnapshot2){
              const articlesData2 = querySnapshot2.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

              const combinedArticlesData = [...articlesData, ...articlesData2];

              setArticles(combinedArticlesData);

            }
            else{
              setArticles(articlesData);
            }            
          } catch (error) {
            console.error('Error fetching articles:', error);
          }
        };

        fetchData();
      }
    }, [location.search]);

    return (
        <div id='galeria'>
            <ul>
            {articles.map((article) => (
                <li key={article.id}><Articulo articulo = {article}/></li>
            ))}
            </ul>
        </div>
    );
};

export default Galeria;