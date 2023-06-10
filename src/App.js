import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from "./initial-page/initial-page";
import Cabecera from "./cabecera/cabecera";
import Pie from "./pie/pie";
import Login from "./login/login";
import Register from "./register/register";
import Admin from "./admin/admin";
import Galeria from "./galeria/galeria";
import Detalle from './detalle/detalle';
import Carrito from './carrito/carrito';
import Compra from './compra/compra';
import firebaseApp from './firebase_config.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { signOut } from '@firebase/auth';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function App() {
  
  const [user, setUser] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [initializing, setInitializing] = useState(true);

  console.log("carrito", carrito);

  async function getRol(uid){
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const infoRol = docSnap.data().rol;
    return infoRol;
  }

  function setUserWithRol(userFirebase){
    getRol(userFirebase.uid).then((rol) => {
      const userData = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        rol: rol
      };
      setUser(userData);
    });
  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        if (!user) {
          setUserWithRol(userFirebase);
        }
      } else {
        setUser(null);
      }

      if (initializing) {
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, [user, initializing]);

  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      console.log("Cerrando sesión");
    }
    ).catch((error) => {
      console.log(error);
    });
  };

  const isAdmin = user && user.rol && user.rol === "admin";

  function agregarAlCarrito(articulo){
    setCarrito([...carrito, articulo]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Cabecera user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          {isAdmin && (
            <Route path="/admin" element={<Admin />} />
          )}
          {!isAdmin &&(
            <Route path="/admin" element={<Navigate to="/" />} />
          )}
          <Route path="/galeria" element={<Galeria />}></Route>
          <Route path="/detalle" element={<Detalle user={user} agregarAlCarrito={agregarAlCarrito} carrito={carrito} setCarrito={setCarrito}/>}/>
          <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} user={user}/>} />
          <Route path="/compra" element={<Compra />} />
          <Route path="*" element={<h1>404</h1>}></Route>
        </Routes>
        <Pie/>
      </BrowserRouter>
    </div>
  );
}

export default App;
