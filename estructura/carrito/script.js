document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioCompra');
    
    formulario.addEventListener('submit', function(event) {
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre') ? document.getElementById('nombre').value.trim() : '';
        const direccion = document.getElementById('direccion') ? document.getElementById('direccion').value.trim() : '';
        const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
        
        // Validar que los campos no estén vacíos
        if (nombre === '' || direccion === '' || email === '') {
            alert("Todos los campos son obligatorios.");
            event.preventDefault(); // Evitar el envío del formulario
            return;
        }
        
        // Validar formato de email
        if (!validateEmail(email)) {
            alert("Formato de correo electrónico inválido.");
            event.preventDefault(); // Evitar el envío del formulario
            return;
        }
    });

    // Función para validar el formato de correo electrónico
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});