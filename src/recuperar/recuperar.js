import React, { useState } from 'react';
import firebaseApp from '../firebase_config.js';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "./recuperar.css";

const auth = getAuth(firebaseApp);

// Componente Recuperar

function Recuperar(){

    const [existo, setExito] = useState(false);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const auth = getAuth(firebaseApp);
        const email = event.target.email.value;

        sendPasswordResetEmail(auth, email)
            .then(() => {
            setExito(true);
            document.getElementById('email').value = '';
            })
            .catch((error) => {
            // Maneja el error de envío de correo electrónico de restablecimiento de contraseña aquí
        });
    };

    return(
        <div id='div_recuperar' className="vh-100 d-flex justify-content-center align-items-center">
            <div className="col-md-4 p-5 shadow-sm border rounded-3">
                <h2 className="text-center mb-4 text-dark">Recuperación de contraseña</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Correo</label>
                        <input type="email" className="form-control border border-dark" id="email" aria-describedby="emailHelp" required/>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-dark" type="submit">Recuperar</button>
                    </div>
                    <div id='exito'>
                        {existo ? <p>Se ha enviado un correo electrónico para restablecer la contraseña</p> : null}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Recuperar;