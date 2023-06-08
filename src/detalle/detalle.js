import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import firebaseApp from '../firebase_config';
import { useNavigate  } from 'react-router-dom';
import Modal from 'react-modal';
import './detalle.css';

Modal.setAppElement('#root');

function Detalle({ user, carrito, setCarrito }) {

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    const [articulo, setArticulo] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    
    const [tipo, setTipo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [editorial, setEditorial] = useState('');
    const [genero, setGenero] = useState('');
    const [genero2, setGenero2] = useState('');
    const [precio, setPrecio] = useState('');
    const [año, setAño] = useState('');
    const [autor, setAutor] = useState('');

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

    const agregarAlCarritoo = (articulo) => {
      setCarrito([...carrito, articulo]);
    };
    // console.log("carrito", carrito);

    const actualizarArticulo = () => {
      openModal2();
    };

    const openModal2 = () => {
      setModalIsOpen2(true);
    };

    const closeModal2 = () => {
      setModalIsOpen2(false);
    };

    const actualizar = async () => {
      const articuloActualizado = {
        tipo,
        titulo,
        editorial,
        genero,
        genero2,
        precio,
        año,
        autor,
      };
      console.log("articuloActualizado", articuloActualizado);
      try {
        const db = getFirestore(firebaseApp);
        const articuloRef = doc(db, 'articulos', id);
        
        await updateDoc(articuloRef, articuloActualizado);
        console.log('Artículo actualizado correctamente');
      } catch (error) {
        console.error('Error al actualizar el artículo:', error);
      }
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
              <button id='agregar' onClick={() => agregarAlCarritoo(articulo)}>Agregar al carrito</button>
              {user && user.rol === "admin" && (
                  <button id='actualizar' onClick={actualizarArticulo}>Actualizar</button>
              )}
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
          <Modal isOpen={modalIsOpen2} onRequestClose={closeModal2} contentLabel="Actualizar">
            <h2>Actualizar</h2>
            <form>
              <label>
                Tipo:
                <select id='tipo' required value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option value='' disabled hidden>
                    {articulo && articulo.tipo}
                  </option>
                  <option value='manga'>Manga</option>
                  <option value='comic'>Comic</option>
                  <option value='novela'>Novela</option>
                  <option value='libro'>Libro</option>
                </select>
              </label>
              <label>
                Título:
                <input type='text' name='titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
              </label>
              <label>
                Editorial:
                <select id="editorial" value={editorial} onChange={(e) => setEditorial(e.target.value)}>
                  <option value="" disabled hidden>
                    {articulo && articulo.editorial}
                  </option>
                  <option value="norma">Norma editorial</option>
                  <option value="marvel">Marvel</option>
                  <option value="dc">DC</option>
                  <option value="ivrea">Ivrea</option>
                  <option value="panini">Panini</option>
                  <option value="milky">Milky Way Ediciones</option>
                  <option value="arechi">Arechi</option>
                  <option value="planeta">Planeta</option>
                  <option value="nova">Nova</option>
                </select>
              </label>
              <label>
                Género:
                <select id="genero" required value={genero} onChange={(e) => setGenero(e.target.value)}>
                  <option value="" disabled hidden>
                    {articulo && articulo.genero}
                  </option>
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
              </label>
              <label>
                Género 2:
                <select id="genero2" required value={genero2} onChange={(e) => setGenero2(e.target.value)}>
                  <option value="" disabled hidden>
                    {articulo && articulo.genero2}
                  </option>
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
              </label>
              <label>
                Precio:
                <input type="text" name="precio" value={precio} onChange={(e) => setPrecio(e.target.value)}/>
              </label>
              <label>
                Año:
                <input type="text" name="año" value={año} onChange={(e) => setAño(e.target.value)}/>
              </label>
              <label>
                Autor:
                <input type="text" name="autor"value={autor} onChange={(e) => setAutor(e.target.value)}/>
              </label>
              <label>
                Imagen:
                <input type="file" name="imagen" />
              </label>
            </form>
            <div>
              <button onClick={actualizar}>Actulizar</button>
              <button onClick={closeModal2}>Cancelar</button>
            </div>
          </Modal>
        </div>
    );
};

export default Detalle;