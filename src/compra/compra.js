import React, { useState } from 'react';
import './compra.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import emailjs from 'emailjs-com';

// Componente Compra

function Compra(user) {
    
    const [selectedDate, setSelectedDate] = useState(null);

    emailjs.init('TPdvkm1SBySbm-OnS');

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

    function enviarCorreo(e) {
        e.preventDefault();
        const templateParams = {
          to_name: user.email,
          from_name: "Comic-Sans"
        };
      
        emailjs.send('service_niwx0ru', 'template_0jjywqk', templateParams)
          .then((response) => {
            console.log('Correo electrónico enviado con éxito', response);
          })
          .catch((error) => {
            console.error('Error al enviar el correo electrónico', error);
        });
        document.getElementById('nombre').value = '';
        document.getElementById('tarjeta').value = '';
        document.getElementById('cvv').value = '';
        document.getElementById('forma_pago').value = 'tarjeta';
        setSelectedDate(null);
    }

    return (
        <div id='divCompra'>
            <h1>Formulario de Pago</h1>
  
            <form action="procesar_pago.php" method="post" onSubmit={enviarCorreo}>
                <label htmlFor="nombre">Nombre completo:</label><br/>
                <input type="text" id="nombre" name="nombre" required/><br/><br/>
                
                <label htmlFor="tarjeta">Número de tarjeta:</label><br/>
                <input type="text" id="tarjeta" name="tarjeta" required maxLength={18} onKeyPress={handleKeyPress}/><br/><br/>
                
                <label htmlFor="fecha">Fecha de vencimiento:</label>
                <DatePicker id='fecha' selected={selectedDate} onChange={handleDateChange} showMonthYearPicker dateFormat="MM/yyyy" /><br/><br/>
                
                <label htmlFor="cvv">CVV:</label><br/>
                <input type="text" id="cvv" name="cvv" required maxLength={3} onKeyPress={handleKeyPress}/><br/><br/>
                
                <label htmlFor="forma_pago">Forma de pago:</label><br/>
                <select id="forma_pago" name="forma_pago">
                <option value="tarjeta">Tarjeta de crédito</option>
                <option value="paypal">PayPal</option>
                <option value="transferencia">Transferencia bancaria</option>
                </select><br/><br/>
            
                <button  className="btn btn-dark" value="Realizar Compra">Realizar Compra</button>
            </form>
        </div>
    );
}

export default Compra;