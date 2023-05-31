import React, { useState } from 'react';
import "./cabecera.css";

function Cabecera({user, handleLogout}) {

    return(
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Tipos</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/manga">Manga</a></li>
                                <li><a className="dropdown-item" href="/comic">Comic</a></li>
                                <li><a className="dropdown-item" href="/libros">Libros</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/novelas">Novelas Ligeras</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Géneros</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Acción</a></li>
                                <li><a className="dropdown-item" href="#">Romance</a></li>
                                <li><a className="dropdown-item" href="#">Fantasía</a></li>
                                <li><a className="dropdown-item" href="#">Terror</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Editoriales/Marca</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/ivrea">Ivrea</a></li>
                                <li><a className="dropdown-item" href="/norma">Norma Editorial</a></li>
                                <li><a className="dropdown-item" href="/planeta">Planeta</a></li>
                                <li><a className="dropdown-item" href="/panini">Panini</a></li>
                                <li><a className="dropdown-item" href="/milky">Milky way Ediciones</a></li>
                                <li><a className="dropdown-item" href="/arechi">Arechi</a></li>
                                <li><a className="dropdown-item" href="/marvel">Marvel</a></li>
                                <li><a className="dropdown-item" href="/dc">DC</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            {user ? (
                                <button className="nav-link active" aria-current="page" id="cerrarS" onClick={(handleLogout)}>Cerrar Sesión</button>
                            ) : (
                                <a className="nav-link active" aria-current="page" href="/login">Iniciar Sesión</a>
                            )}
                        </li>
                        <li className="nav-item">
                            {user && user.rol === "admin" ? (
                                <a className="nav-link active" aria-current="page" href="/admin">Añadir Artículo</a>
                            ) : (
                                <a className="nav-link active" aria-current="page" href="/#"></a>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Cabecera;