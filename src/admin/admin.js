import React from 'react';

function Admin(){

    return(
        <div>
            <form>
                <input type="text" id="titulo" placeholder="Título"/>
                <input type="text" id="editorial" placeholder="Editorial"/>
                <input type="text" id="año" placeholder="Año"/>
                <input type="text" id="autor" placeholder="Autor"/>
                <input type="text" id="genero" placeholder="Género"/>
                <input type="text" id="Precio" placeholder="Precio"/>
                <input type="text" id="imagen" placeholder="Imagen"/>
            </form>
        </div>
    );
};

export default Admin;