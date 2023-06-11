import React, { useState } from 'react';
import firebaseApp from '../firebase_config.js';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import './register.css';

const auth = getAuth(firebaseApp);

// Componente Register

function Register(){

    const db = getFirestore(firebaseApp);

    const [errorVisible, seterrorVisible] = useState(false);
    const [error, setError] = useState("");

    function submitR (e){
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if(validarFormulario(email, password)){
            
            if(email == "samgope100@gmail.com"){
                var rol = "admin";
            }
            else{
                var rol = "user";
            }
            registerEmailPassword(email, password, rol);
        }
        else{
            console.log("Error");
        }
    }

    function submitR2 (e){
        e.preventDefault();
        registerWithGoogle();
    }

    async function registerEmailPassword(email, password, rol){
        const infoUser = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user;
        });
        // console.log(infoUser);
        const docuREef = doc(db, "users", infoUser.uid);
        setDoc(docuREef, {correo: email, rol: rol});
    }

    async function registerWithGoogle(rol){
        const infoUser = await signInWithPopup(auth, new GoogleAuthProvider())
        .then((userCredential) => {
            return userCredential.user;
        })
        // console.log(infoUser);
        const email = infoUser.email;
        if(email == "samgope100@gmail.com"){
            var rol = "admin";
        }
        else{
            var rol = "user";
        }
        const docuREef = doc(db, "users", infoUser.uid);
        setDoc(docuREef, {correo: email, rol: rol});
    }

    function validarFormulario(email, password){    
        var hasLetter = /[a-zA-Z]/.test(password);
        var hasNumber = /[0-9]/.test(password);
        var hasDotAndLetters = /\.[a-zA-Z]+/.test(email);
        if(!hasDotAndLetters){
            setError("El correo debe acabar en '.com'/'.es'....");
            seterrorVisible(true);
        }
        else if(!hasLetter || !hasNumber){
            setError("La contraseña debe tener al menos una letra, un número y una longitud mínima de 6 caracteres");
            seterrorVisible(true);
        }
        else{
            seterrorVisible(false);
            document.getElementById('name').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            return true;
        }
    }

    return(
        <div id="div_register">
            <div id="register" className="vh-100 d-flex justify-content-center align-items-center">
                <div className="col-md-4 p-5 shadow-sm border rounded-3">
                    <h2 className="text-center mb-4 text-dark">Formulario de Registro</h2>
                    <form onSubmit={submitR}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" id="name" className="form-control border border-dark"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Correo</label>
                            <input type="email" id="email" className="form-control border border-dark" aria-describedby="emailHelp"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input type="password" minLength={6} id="password" className="form-control border border-dark"/>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-dark" type="submit">Registro</button>
                        </div>
                        <div id='error' style={{ display: errorVisible ? 'block' : 'none' }}>
                            <p className="text-danger">{error}</p>
                        </div>
                    </form>
                </div>
                <div id="register_google" className="col-md-4 p-5 shadow-sm border rounded-3">
                    <form onSubmit={submitR2}>
                        <h2 className="text-center mb-4 text-dark">Registro con Google</h2>
                        <div className="d-grid">
                            <button className="btn btn-dark" type="submit">Registro</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;