import React, { useState } from 'react';
import firebaseApp from '../firebase_config.js';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(firebaseApp);

function Login(){

    const [logeado, setLogeado] = useState(false);

    function submitL(e){
        e.preventDefault();
        if(validarFormulario()){
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            signInWithEmailAndPassword(auth, email, password);
            setLogeado(true);
            console.log(logeado);
        }
        else{
            console.log("Error");
        }
    }

    function submitL2 (e){
        e.preventDefault();
        if(validarFormulario2()){
            registerWithGoogle();
        }
        else{
            console.log("Error");
        }
    }

    async function registerWithGoogle(){
        signInWithPopup(auth, new GoogleAuthProvider())
        .then((result) => {
            setLogeado(true);
        }).catch((error) => {
            console.log(error);
            setLogeado(false);
        });
    }  

    function validarFormulario(){
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if(email === "" || password === ""){
            return false;
        }
        else{
            return true;
        }
    }

    function validarFormulario2(){
        return true;
    }


    return(
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="col-md-4 p-5 shadow-sm border rounded-3">
                <h2 className="text-center mb-4 text-dark">Formulario Inicio Sesión</h2>
                <form onSubmit={submitL}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Correo</label>
                        <input type="email" className="form-control border border-dark" id="email" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                        <input type="password" className="form-control border border-dark" id="password"/>
                    </div>
                    {/* <p cla ssName="small"><a className="text-dark" href="forget-password.html">Forgot password?</a></p> */}
                    <div className="d-grid">
                        <button className="btn btn-dark" type="submit">Iniciar Sesión</button>
                    </div>
                </form>
                <div className="mt-3">
                    <p className="mb-0 text-center">¿No tienes una cuenta?<a href="/register" className="text-dark fw-bold">Registrarse</a></p>
                </div>
            </div>
            <div id="register_google" className="col-md-4 p-5 shadow-sm border rounded-3">
                    <form onSubmit={submitL2}>
                        <h2 className="text-center mb-4 text-dark">Inicio de Sesión con Google</h2>
                        <div className="d-grid">
                            <button className="btn btn-dark" type="submit">Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
        </div>
    );
};

export default Login;