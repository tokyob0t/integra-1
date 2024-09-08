document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    // Aquí puedes agregar la lógica para enviar los datos al servidor o cualquier otra acción necesaria.
    console.log(`Nombre: ${nombre}`);
    console.log(`Teléfono: ${telefono}`);
    console.log(`Dirección: ${direccion}`);
    console.log(`Correo Electrónico: ${correo}`);
    console.log(`Contraseña: ${contrasena}`);

    alert('¡Registro completado con éxito!');
});