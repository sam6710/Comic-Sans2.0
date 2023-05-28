import React from 'react';
import Novedades from '../novedades/novedades';
import Carrusel from '../carrusel/carrusel';

function Landing(){

    return(
        <div id="landing">
            <Carrusel/>
            <Novedades/>
        </div>
    );
};

export default Landing;