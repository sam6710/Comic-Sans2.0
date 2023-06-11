import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import firebaseApp from '../firebase_config';
import { useNavigate  } from 'react-router-dom';
import Modal from 'react-modal';
import './detalle.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

Modal.setAppElement('#root');

// Componente Dettalle

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
    const [imagen, setImagen] = useState(null);

    const [agregadoVisible, setAgregadoVisible] = useState(false);

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

    useEffect(() => {
      if (modalIsOpen || modalIsOpen2) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    }, [modalIsOpen, modalIsOpen2]);

    // Abrir y cerrar los Modal de actualizar y eliminar
    const openModal = () => {
      setModalIsOpen(true);
    };
    const closeModal = () => {
      setModalIsOpen(false);
    };
    const openModal2 = () => {
      setModalIsOpen2(true);
    };
    const closeModal2 = () => {
      setModalIsOpen2(false);
    };
    const borrarArticulo = async () => {
      openModal();
    };
    const actualizarArticulo = () => {
      openModal2();
    };

    // Confirmar el borrado de un artículo
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
      setAgregadoVisible(true);

      setTimeout(() => {
        setAgregadoVisible(false);
      }, 2000);
    };

    const actualizar = async () => {
      const articuloActualizado = {
        tipo: tipo !== '' ? tipo : articulo.tipo,
        titulo: titulo !== '' ? titulo : articulo.titulo,
        editorial: editorial !== '' ? editorial : articulo.editorial,
        genero: genero !== '' ? genero : articulo.genero,
        genero2: genero2 !== '' ? genero2 : articulo.genero2,
        precio: precio !== '' ? precio : articulo.precio,
        año: año !== '' ? año : articulo.año,
        autor: autor !== '' ? autor : articulo.autor,
      };
      console.log("articuloActualizado", articuloActualizado);
      try {
        const db = getFirestore(firebaseApp);
        const articuloRef = doc(db, 'articulos', id);
        
        await updateDoc(articuloRef, articuloActualizado);

        if (imagen) {
          const storage = getStorage(firebaseApp);
          const storageRef = ref(storage, "imagenes_productos/" + "S" + imagen.lastModified + "A" + imagen.size + "M");
          await uploadBytes(storageRef, imagen);
          const downloadURL = await getDownloadURL(storageRef);
    
          await updateDoc(articuloRef, { imagen: downloadURL });
        }

        console.log('Artículo actualizado correctamente');
      } catch (error) {
        console.error('Error al actualizar el artículo:', error);
      }
      closeModal2();
    };

    // Función para poner en mayúscula la primera letra de una palabra
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.substring(1);
    };

    return (
        <div id='detalle'>
          {articulo ? (
            <>
            <div id='imagen'>
              <img src={articulo && articulo.imagen} alt="Imagen del artículo" />
            </div>
            <div id='info'>
                <h2>{articulo && articulo.titulo}</h2>
                <div id='datos'>
                  <p><b>Editorial:</b> {capitalizeFirstLetter(articulo && articulo.editorial)}</p>
                  <p><b>Género:</b> {capitalizeFirstLetter(articulo && articulo.genero)}</p>
                  {articulo && articulo.genero2 && (
                    <p><b>Género 2:</b> {capitalizeFirstLetter(articulo && articulo.genero2)}</p>
                  )}
                  <p><b>Precio:</b> {articulo && articulo.precio}</p>
                  <p><b>Año publicación:</b>{articulo && articulo.año}</p>
                  <p><b>Autor:</b> {articulo && articulo.autor}</p>
                </div>
            </div>
            <div id='acciones'>
                <h4 id='precioH4'>{articulo.precio}€</h4>
                <button id='agregar' className="btn btn-dark" onClick={() => agregarAlCarritoo(articulo)}>Agregar al carrito</button>
                {user && user.rol === "admin" && (
                    <button id='actualizar' className="btn btn-dark" onClick={actualizarArticulo}>Actualizar</button>
                )}
                {user && user.rol === "admin" && (
                    <button id='borrar' className="btn btn-dark" onClick={borrarArticulo}>Borrar</button>
                )}
                <div id='añadido' style={{ display: agregadoVisible ? 'block' : 'none' }}>
                  <p>Artículo añadido al carrito</p>
                </div>
            </div>
            <Modal id='borrarModal' isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Confirmar Borrado">
              <h2>Confirmar Borrado</h2>
              <p>¿Estás seguro de que deseas borrar este artículo?</p>
              <div id='borrarModalDiv'>
                <button className="btn btn-dark" onClick={confirmarBorrado}>Sí, borrar</button>
                <button className="btn btn-dark" id='cancelarBorrado' onClick={closeModal}>Cancelar</button>
              </div>
            </Modal>
            <Modal id='actu_modal' isOpen={modalIsOpen2} onRequestClose={closeModal2} contentLabel="Actualizar">
              <h2>Actualizar</h2>
              <form id='form_actu'>
                <div id="actualizacionSeccion1">
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
                </div>
                <div id="actualizacionSeccion2">
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
                </div>
                <div id="actualizacionSeccion3">
                  <label id='imgActuLabel'>
                    Imagen:
                    <input type="file" name="imagen" className='file-select' onChange={(e) => setImagen(e.target.files[0])} />
                  </label>
                </div>
              </form>
              <div id='botones'>
                <button className="btn btn-dark" id='botonActu' onClick={actualizar}>Actulizar</button>
                <button className="btn btn-dark" id='cancelarActu' onClick={closeModal2}>Cancelar</button>
              </div>
            </Modal>
            </>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
    );
};

export default Detalle;