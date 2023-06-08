import React from 'react';

function Compra() {

    return (
        <div>
            <h1>Formulario de Pago</h1>
  
            <form action="procesar_pago.php" method="post">
                <label for="nombre">Nombre completo:</label>
                <input type="text" id="nombre" name="nombre" required/><br/><br/>
                
                <label for="tarjeta">Número de tarjeta:</label>
                <input type="text" id="tarjeta" name="tarjeta" required/><br/><br/>
                
                <label for="fecha">Fecha de vencimiento:</label>
                <input type="text" id="fecha" name="fecha" required/><br/><br/>
                
                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" name="cvv" required/><br/><br/>
                
                <label for="forma_pago">Forma de pago:</label>
                <select id="forma_pago" name="forma_pago">
                <option value="tarjeta">Tarjeta de crédito</option>
                <option value="paypal">PayPal</option>
                <option value="transferencia">Transferencia bancaria</option>
                </select><br/><br/>
                
                <input type="submit" value="Realizar pago"/>
            </form>
        </div>
    );
}

export default Compra;