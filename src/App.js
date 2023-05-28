import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from "./initial-page/initial-page";
import Cabecera from "./cabecera/cabecera";
import Pie from "./pie/pie";
import Login from "./login/login";
import Register from "./register/register";
import Admin from "./admin/admin";
import firebaseApp from './firebase_config.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { signOut } from '@firebase/auth';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

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
      console.log("aaaa", userData);
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

  return (
    <div className="App">
      <BrowserRouter>
        <Cabecera user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="*" element={<h1>404</h1>}></Route>
        </Routes>
        <Pie/>
      </BrowserRouter>
    </div>
  );
}

export default App;
