import React, { useEffect, useState } from 'react';
import firebaseApp from '../firebase_config.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, getDocs, collection } from 'firebase/firestore';
import './admin.css';

// Componente Admin

function Admin(){
    
    const storage = getStorage();
    const db = getFirestore(firebaseApp);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    // Función para subir imagen a Storage de Firebase y vincularla a un producto en Firestore
    function subirImagen(e){
        e.preventDefault();

        const imagen = document.getElementById('imagen').files[0];

        const storageRef = ref(storage, "imagenes_productos/" + "S" + imagen.lastModified + "A" + imagen.size + "M");

        uploadBytes(storageRef, imagen).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(storageRef).then((url) => {
                crearProducto(url);
            }).catch((error) => {
               console.log("Error al obtener la URL", error);
            });
        });
    }

    // Función que crea un producto en Firestore
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
            fecha: fechaActual,
        }

        const docuREef = doc(db, "articulos", titulo);
        setDoc(docuREef, producto);

        document.getElementById('tipo').value = "";
        document.getElementById('titulo').value = "";
        document.getElementById('editorial').value = "";
        document.getElementById('año').value = "";
        document.getElementById('autor').value = "";
        document.getElementById('genero').value = "";
        document.getElementById('genero2').value = "";
        document.getElementById('precio').value = "";
        document.getElementById('imagen').value = "";
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const usersData = usersSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleUserSelection = (e) => {
        setSelectedUser(e.target.value);
    };

    const convertToAdmin = () => {
        if (selectedUser) {
            // Actualizar el usuario seleccionado en la base de datos para convertirlo en administrador
            const userRef = doc(db, 'users', selectedUser);
            setDoc(userRef, { rol: 'admin' }, { merge: true });
        }
    };

    const convertTouser = () => {
        if (selectedUser) {
            // Actualizar el usuario seleccionado en la base de datos para convertirlo en usuario normal
            const userRef = doc(db, 'users', selectedUser);
            setDoc(userRef, { rol: 'user' }, { merge: true });
        }
    };

    return(
        <div id='admin'>
            <div id="añadirArticulo">
                <form id='form1' onSubmit={subirImagen}>
                    <h2>Añadir nuevo producto</h2>
                    <div id='Articuloseccion1'>
                        <label for="tipo">Tipo</label>
                        <select id="tipo">
                            <option value="" disabled selected hidden>Tipo</option>
                            <option value="manga">Manga</option>
                            <option value="comic">Comic</option>
                            <option value="novela_ligera">Novela ligera</option>
                            <option value="novela">Novela</option>
                        </select>
                        <label for="titulo">Título</label>
                        <input type="text" id="titulo" placeholder="Título" required/>
                        <label for="editorial">Editorial</label>
                        <select id="editorial">
                            <option value="" disabled selected hidden>Editorial</option>
                            <option value="norma">Norma editorial</option>
                            <option value="ivrea">Ivrea</option>
                            <option value="panini">Panini</option>
                            <option value="milky">Milky Way Ediciones</option>
                            <option value="arechi">Arechi</option>
                            <option value="planeta">Planeta</option>
                            <option value="nova">Nova</option>
                            <option value="kibook">Kibook</option>
                        </select>
                        <label for="año">Año</label>
                        <input type="text" id="año" placeholder="Año"/>
                    </div>
                    <div id='Articuloseccion2'>
                        <label for="autor">Autor</label>
                        <input type="text" id="autor" placeholder="Autor"/>
                        <label for="genero">Género</label>
                        <select id="genero" required>
                            <option value="" disabled selected hidden>Género</option>
                            <option value="fantasia">Fantasía</option>
                            <option value="terror">Terror</option>
                            <option value="ciencia_ficcion">Ciencia ficción</option>
                            <option value="romance">Romance</option>
                            <option value="historica">Histórica</option>
                            <option value="cotidiano">Cotidiano</option>
                            <option value="accion">Accion</option>
                            <option value="comedia">Comedia</option>
                            <option value="aventura">Aventura</option>
                            <option value="infantil">Infantil</option>
                            <option value="juvenil">Juvenil</option>
                            <option value="adulto">Adulto</option>
                        </select>
                        <label for="genero2">Género2</label>
                        <select id="genero2">
                            <option value="" disabled selected hidden>Género2</option>
                            <option value="fantasia">Fantasía</option>
                            <option value="terror">Terror</option>
                            <option value="ciencia_ficcion">Ciencia ficción</option>
                            <option value="romance">Romance</option>
                            <option value="historica">Histórica</option>
                            <option value="cotidiano">Cotidiano</option>
                            <option value="accion">Accion</option>
                            <option value="comedia">Comedia</option>
                            <option value="aventura">Aventura</option>
                            <option value="infantil">Infantil</option>
                            <option value="juvenil">Juvenil</option>
                            <option value="adulto">Adulto</option>
                        </select>
                        <label for="precio">Precio</label>
                        <input type="text" id="precio" placeholder="Precio" required/>
                    </div>
                    <div id='Articuloseccion3'>
                        <label id='imagenLabel' for="imagen">Imagen</label>
                        <br/>
                        <input type="file" id="imagen" placeholder="Imagen" className='file-select' required/>
                        <br/>
                        <button className="btn btn-dark" type="submit">Añadir</button>
                    </div>
                </form>
            </div>
            <div id="añadirAdmin">
                <form>
                    <h2>Añadir Admin</h2>
                    <select className="selectUser" value={selectedUser} onChange={handleUserSelection}>
                        <option value="">Seleccione un usuario</option>
                        {users
                            .filter((user) => user.rol === 'user')
                            .map((user) => (
                            <option key={user.id} value={user.id}>{user.correo}</option>
                            ))}
                    </select>
                    <br/>
                    <button className="btn btn-dark" type="button" onClick={convertToAdmin}>Convertir en administrador</button>
                </form>
            </div>
            <div id="quitarAdmin">
                <form>
                    <h2>Quitar Admin</h2>
                    <select className="selectUser" value={selectedUser} onChange={handleUserSelection}>
                        <br/>
                        <option value="">Seleccione un usuario</option>
                        {users
                            .filter((user) => user.rol === 'admin')
                            .map((user) => (
                            <option key={user.id} value={user.id}>{user.correo}</option>
                            ))}
                    </select>
                    <br/>
                    <button className="btn btn-dark" type="button" onClick={convertTouser}>Convertir en usuario normal</button>
                </form>
            </div>
        </div>
        
    );
};

export default Admin;