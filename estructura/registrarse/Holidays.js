document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('telefono', telefono);
    formData.append('direccion', direccion);
    formData.append('correo', correo);
    formData.append('contrasena', contrasena);
    formData.append('Tipo_usuario', "Usuario");

    fetch('guardar_registro.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        alert('¡Registro completado con éxito!');
    })
    .catch(error => console.error('Error:', error));
});