import React from 'react';
import firebaseApp from '../firebase_config';
import { getFirestore } from "firebase/firestore"
import { getDocs, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import Articulo from '../articulo/articulo';

function Galeria() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore(firebaseApp);
                const querySnapshot = await getDocs(collection(db, "articulos"));

                const articlesData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setArticles(articlesData);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };
        // console.log(articles);
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