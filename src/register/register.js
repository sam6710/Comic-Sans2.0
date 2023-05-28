import React from 'react';
import firebaseApp from '../firebase_config.js';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth(firebaseApp);

function Register(){
    const db = getFirestore(firebaseApp);

    function submitR (e){
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if(email == "samgope100@gmail.com"){
            var rol = "admin";
        }
        else{
            var rol = "user";
        }

        console.log(email, password, rol);
        registerEmailPassword(email, password, rol);
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
        console.log(infoUser);
        const docuREef = doc(db, "users", infoUser.uid);
        setDoc(docuREef, {correo: email, rol: rol});
    }

    async function registerWithGoogle(rol){
        const infoUser = await signInWithPopup(auth, new GoogleAuthProvider())
        .then((userCredential) => {
            return userCredential.user;
        })
        console.log(infoUser);
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

    return(
        <div id="div_register">
            <div id="register" className="vh-100 d-flex justify-content-center align-items-center">
                <div className="col-md-4 p-5 shadow-sm border rounded-3">
                    <h2 className="text-center mb-4 text-dark">Formulario de Registro</h2>
                    <form onSubmit={submitR}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            {/* <!-- <input type="text" className="form-control border border-dark" [(ngModel)]="name" [ngModelOptions]="{standalone:true}"> --> */}
                            <input type="text" id="name" className="form-control border border-dark"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Correo</label>
                            {/* <!-- <input type="email" className="form-control border border-dark" aria-describedby="emailHelp" [(ngModel)]="email" [ngModelOptions]="{standalone:true}"> --> */}
                            <input type="email" id="email" className="form-control border border-dark" aria-describedby="emailHelp"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            {/* <!-- <input type="password" className="form-control border border-dark" [(ngModel)]="password" [ngModelOptions]="{standalone:true}"> --> */}
                            <input type="password" id="password" className="form-control border border-dark"/>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-dark" type="submit">Registro</button>
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