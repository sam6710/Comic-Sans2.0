import './App.css';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Landing from "./initial-page/initial-page";
import Cabecera from "./cabecera/cabecera";
import Pie from "./pie/pie";
import Login from "./login/login";
import Register from "./register/register";
import Admin from "./admin/admin";
import Galeria from "./galeria/galeria";
import Detalle from './detalle/detalle';
import Carrito from './carrito/carrito';
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

  console.log("carrito3", carrito);

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
      // console.log("aaaa", userData);
    });
  }

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if(!user){
        setUserWithRol(userFirebase);
      }
    } else {
      setUser(null);
    }
  });

  const handleLogout = () => {
    signOut(auth)
    .then(() => {
        console.log("Cerrando sesión");
    }
    ).catch((error) => {
        console.log(error);
    });
  };

  const agregarAlCarrito = (articulo) => {
    console.log("articulo", articulo);
    console.log("carrito1", carrito);
    // setCarrito([...carrito, articulo]);
    setCarrito(prevCarrito => [...prevCarrito, articulo]);
    console.log("carrito2", carrito);
  };

  const isAdmin = user && user.rol == "admin";
  // console.log("isAdmin", isAdmin);
  // console.log("user", user);
  // console.log("user.rol", user && user.rol);

  return (
    <div className="App">
      <BrowserRouter>
        <Cabecera user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          {isAdmin ? (
            <Route path="/admin" element={<Admin />} />
          ) : (
            <Route path="/admin" element={<Navigate to="/" />} />
          )}
          <Route path="/galeria" element={<Galeria />}></Route>
          <Route path="/detalle" element={<Detalle agregarAlCarrito={agregarAlCarrito}/>}/>
          <Route path="/carrito" element={<Carrito carrito={carrito} />} />
          <Route path="*" element={<h1>404</h1>}></Route>
        </Routes>
        <Pie/>
      </BrowserRouter>
    </div>
  );
}

export default App;
