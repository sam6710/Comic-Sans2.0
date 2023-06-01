import React from 'react';
import firebaseApp from '../firebase_config.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from 'firebase/firestore';

function Admin(){
    
    const storage = getStorage();
    const db = getFirestore(firebaseApp);

    function subirImagen(e){
        e.preventDefault();

        const imagen = document.getElementById('imagen').files[0];

        const storageRef = ref(storage, "imagenes_productos/" + "S" + imagen.lastModified + "A" + imagen.size + "M");

        uploadBytes(storageRef, imagen).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });

        getDownloadURL(storageRef).then((url) => {
            console.log(url);
            crearProducto(url)
        });
    }

    function crearProducto(url){

        const tipo = document.getElementById('tipo').value;
        const titulo = document.getElementById('titulo').value;
        const editorial = document.getElementById('editorial').value;
        const año = document.getElementById('año').value;
        const autor = document.getElementById('autor').value;
        const genero = document.getElementById('genero').value;
        const genero2 = document.getElementById('genero2').value;
        const precio = document.getElementById('precio').value;
        const fechaActual = new Date();

        const producto = {
            tipo: tipo,
            titulo: titulo,
            editorial: editorial,
            año: año,
            autor: autor,
            genero: genero,
            genero2: genero2,
            precio: precio,
            imagen: url,
            fecha: fechaActual
        }
        console.log(producto);
        const docuREef = doc(db, "articulos", titulo);
        setDoc(docuREef, producto);
    }

    return(
        <div>
            <form onSubmit={subirImagen}>
                <h2>Añadir nuevo producto</h2>
                <label for="tipo">Tipo</label>
                <select id="editorial">
                    <option value="manga">manga</option>
                    <option value="comic">Comic</option>
                    <option value="novela">Novela ligera</option>
                </select>
                <label for="titulo">Título</label>
                <input type="text" id="titulo" placeholder="Título" required/>
                <label for="editorial">Editorial</label>
                <select id="editorial">
                    <option value="norma">Norma editorial</option>
                    <option value="marvel">Marvel</option>
                    <option value="dc">DC</option>
                    <option value="ivrea">Ivrea</option>
                    <option value="panini">Panini</option>
                    <option value="milky">Milky Way Ediciones</option>
                    <option value="arechi">Arechi</option>
                    <option value="planeta">Planeta</option>
                </select>
                <label for="año">Año</label>
                <input type="text" id="año" placeholder="Año"/>
                <label for="autor">Autor</label>
                <input type="text" id="autor" placeholder="Autor"/>
                <label for="genero">Género</label>
                <select id="genero" required>
                    <option value="fantasia">Fantasía</option>
                    <option value="terror">Terror</option>
                    <option value="ciencia_ficcion">Ciencia ficción</option>
                    <option value="romantica">Romántica</option>
                    <option value="historica">Histórica</option>
                    <option value="cotidiano">Cotidiano</option>
                    <option value="accion">Accion</option>
                    <option value="comedia">Comedia</option>
                    <option value="infantil">Infantil</option>
                    <option value="juvenil">Juvenil</option>
                    <option value="adulto">Adulto</option>
                </select>
                <label for="genero2">Género2</label>
                <select id="genero2">
                    <option value="fantasia">Fantasía</option>
                    <option value="terror">Terror</option>
                    <option value="ciencia_ficcion">Ciencia ficción</option>
                    <option value="romantica">Romántica</option>
                    <option value="historica">Histórica</option>
                    <option value="cotidiano">Cotidiano</option>
                    <option value="accion">Accion</option>
                    <option value="comedia">Comedia</option>
                    <option value="infantil">Infantil</option>
                    <option value="juvenil">Juvenil</option>
                    <option value="adulto">Adulto</option>
                </select>
                <label for="precio">Precio</label>
                <input type="text" id="precio" placeholder="Precio" required/>
                <label for="imagen">Imagen</label>
                <input type="file" id="imagen" placeholder="Imagen"/>
                <button className="btn btn-dark" type="submit">Añadir</button>
            </form>
        </div>
    );
};

export default Admin;