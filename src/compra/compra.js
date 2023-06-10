import React, { useState } from 'react';
import './compra.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

function Compra() {
    
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleKeyPress = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9]*$/; // Expresión regular para solo permitir números
    
        if (!numericRegex.test(keyValue)) {
          event.preventDefault();
        }
      };

    return (
        <div id='divCompra'>
            <h1>Formulario de Pago</h1>
  
            <form action="procesar_pago.php" method="post">
                <label for="nombre">Nombre completo:</label><br/>
                <input type="text" id="nombre" name="nombre" required/><br/><br/>
                
                <label for="tarjeta">Número de tarjeta:</label><br/>
                <input type="text" id="tarjeta" name="tarjeta" required maxLength={18} onKeyPress={handleKeyPress}/><br/><br/>
                
                <label for="fecha">Fecha de vencimiento:</label>
                <DatePicker id='fecha' selected={selectedDate} onChange={handleDateChange} showMonthYearPicker dateFormat="MM/yyyy" /><br/><br/>
                
                <label for="cvv">CVV:</label><br/>
                <input type="text" id="cvv" name="cvv" required maxLength={3} onKeyPress={handleKeyPress}/><br/><br/>
                
                <label for="forma_pago">Forma de pago:</label><br/>
                <select id="forma_pago" name="forma_pago">
                <option value="tarjeta">Tarjeta de crédito</option>
                <option value="paypal">PayPal</option>
                <option value="transferencia">Transferencia bancaria</option>
                </select><br/><br/>
                
                <input type="submit" className="btn btn-dark" value="Realizar Compra"/>
            </form>
        </div>
    );
}

export default Compra;