import React from 'react';
import Novedades from '../novedades/novedades';
import Carrusel from '../carrusel/carrusel';
import "./initial-page.css";

// Componente Landing (página inicial)

function Landing(){

    return(
        <div id="landing">
            <Carrusel/>
            <Novedades/>
        </div>
    );
};

export default Landing;