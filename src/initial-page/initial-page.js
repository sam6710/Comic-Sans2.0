import React from 'react';
import Novedades from '../novedades/novedades';
import Carrusel from '../carrusel/carrusel';

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