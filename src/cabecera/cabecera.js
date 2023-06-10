import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./cabecera.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Buscador from '../buscador/buscador';

function Cabecera({user, handleLogout}) {

    const logo = "./imagenes/logo.jpg";

    return(
        <nav className="navbar navbar-expand-lg bg-light border-bottom">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img id='logo' src={logo}></img></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav" id='nav1'>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Tipos</Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/galeria?tipo=manga">Manga</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?tipo=comic">Comic</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?tipo=novela">Novelas Ligeras</Link></li>
                                <li><Link className="dropdown-item" to="/galeria">Libros</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Géneros</Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/galeria?genero=fantasia">Fantasía</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?genero=terror">Terror</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?genero=ciencia_ficcion">Ciencia ficción</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?genero=romance">Romance</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?genero=historica">Histórica</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?genero=cotidiano">Cotidiano</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?genero=accion">Acción</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?genero=comedia">Comedia</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?genero=aventura">Aventura</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?genero=infantil">Infantil</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?genero=juvenil">Juvenil</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?genero=adulto">Adulto</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Editoriales/Marca</Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/galeria?editorial=ivrea">Ivrea</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?editorial=norma">Norma Editorial</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?editorial=planeta">Planeta</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?editorial=panini">Panini</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?editorial=milky">Milky Way Ediciones</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?editorial=arechi">Arechi</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?editorial=nova">Nova</Link></li>
                                <li><Link className="dropdown-item" to="/galeria?editorial=kibook">Kibook</Link></li>
                            </ul>
                        </li>
                        <Buscador />
                    </ul>
                    <ul className='navbar-nav' id='nav2'>
                        <li className="nav-item">
                            {user ? (
                                <button className="nav-link active" aria-current="page" id="cerrarS" onClick={(handleLogout)}><Link to="/"><i id='cSesion' class="fa fa-sign-out" aria-hidden="true"></i></Link></button>
                            ) : (
                                <Link className="nav-link active" aria-current="page" to="/login">Iniciar Sesión</Link>
                            )}
                        </li>
                        <li className="nav-item">
                            {user && user.rol === "admin" ? (
                                <Link className="nav-link active" aria-current="page" to="/admin">Administración</Link>
                            ) : (
                                <Link className="nav-link active" aria-current="page" to="/#"></Link>
                            )}
                        </li>
                        <Link id='carrito_container' to="/carrito"><FontAwesomeIcon id="carritoIcon" icon={faShoppingCart} /></Link>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Cabecera;