import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./cabecera.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Buscador from '../buscador/buscador';

function Cabecera({user, handleLogout}) {

    return(
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav" id='nav1'>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Tipos</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/galeria?tipo=manga">Manga</a></li>
                                <li><a className="dropdown-item" href="/galeria?tipo=comic">Comic</a></li>
                                <li><a className="dropdown-item" href="/galeria?tipo=novela">Novelas Ligeras</a></li>
                                <li><a className="dropdown-item" href="/galeria">Libros</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Géneros</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/galeria?genero=fantasia">Fantasía</a></li>
                                <li><a className="dropdown-item" href="/galeria?genero=terror">Terror</a></li>
                                <li><a className="dropdown-item" href="/galeria?genero=ciencia_ficcion">Ciencia ficción</a></li>
                                <li><a className="dropdown-item" href="/galeria?genero=romance">Romance</a></li>
                                <li><a className="dropdown-item" href="/galeria?genero=histórica">Histórica</a></li>
                                <li><a className="dropdown-item" href="/galeria?genero=cotidiano">Cotidiano</a></li>
                                <li><a className="dropdown-item" href="/galeria?genero=accion">Acción</a></li>
                                <li><a className="dropdown-item" href="/galeria?genero=comedia">Comedia</a></li>
                                <li><a className="dropdown-item" href="/galeria?genero=aventura">Aventura</a></li>
                                <li><a className="dropdown-item" href="/galeria?genero=infantil">Infantl</a></li>
                                <li><a className="dropdown-item" href="/galeria?genero=juvenil">Juvenil</a></li>
                                <li><a className="dropdown-item" href="/galeria?genero=adulto">Adulto</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Editoriales/Marca</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/galeria?editorial=ivrea">Ivrea</a></li>
                                <li><a className="dropdown-item" href="/galeria?editorial=norma">Norma Editorial</a></li>
                                <li><a className="dropdown-item" href="/galeria?editorial=planeta">Planeta</a></li>
                                <li><a className="dropdown-item" href="/galeria?editorial=panini">Panini</a></li>
                                <li><a className="dropdown-item" href="/galeria?editorial=milky">Milky Way Ediciones</a></li>
                                <li><a className="dropdown-item" href="/galeria?editorial=arechi">Arechi</a></li>
                                <li><a className="dropdown-item" href="/galeria?editorial=marvel">Marvel</a></li>
                                <li><a className="dropdown-item" href="/galeria?editorial=dc">DC</a></li>
                                <li><a className="dropdown-item" href="/galeria?editorial=nova">Nova</a></li>
                            </ul>
                        </li>
                        <Buscador />
                    </ul>
                    <ul className='navbar-nav' id='nav2'>
                        <li className="nav-item">
                            {user ? (
                                <button className="nav-link active" aria-current="page" id="cerrarS" onClick={(handleLogout)}>Cerrar Sesión</button>
                            ) : (
                                <a className="nav-link active" aria-current="page" href="/login">Iniciar Sesión</a>
                            )}
                        </li>
                        <li className="nav-item">
                            {user && user.rol === "admin" ? (
                                <Link className="nav-link active" aria-current="page" to="/admin">Administración</Link>
                            ) : (
                                <a className="nav-link active" aria-current="page" href="/#"></a>
                            )}
                        </li>
                        <a href="/carrito"><FontAwesomeIcon id="carrito" icon={faShoppingCart} /></a>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Cabecera;