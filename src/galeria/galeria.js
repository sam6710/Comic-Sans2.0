import React, { useState, useEffect } from 'react';
import firebaseApp from '../firebase_config';
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore"
import Articulo from '../articulo/articulo';

function Galeria() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const db = getFirestore(firebaseApp);
              let querySnapshot;
      
              const url = new URL(window.location.href);
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
              } else if (editorial) {
                console.log("editorial", editorial);
                querySnapshot = await getDocs(
                  query(collection(db, 'articulos'), where('editorial', '==', editorial))
                );
              } else {
                querySnapshot = await getDocs(collection(db, 'articulos'));
              }
      
              const articlesData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
      
              setArticles(articlesData);
            } catch (error) {
              console.error('Error fetching articles:', error);
            }
          };
      
          fetchData();
        }, []);

    return (
        <div>
            {articles.map((article) => (
                // <section key={article.id}>
                //     <h2>{article.titulo}</h2>
                //     <p>{article.content}</p>
                // </section>
                <Articulo articulo = {article}/>
            ))}
            
        </div>
    );
};

export default Galeria;