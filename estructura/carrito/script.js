document.addEventListener('DOMContentLoaded', function () {
    const loginStatus = document.getElementById('login-status');
    
    fetch('http://localhost/estructura/php/session_status.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'logged_in') {
                loginStatus.innerHTML = `Sesión iniciada como: ${data.nombre}`;
            } else {
                loginStatus.innerHTML = '<a href="../loguearse/index.html">Registrarse</a>';
            }
        })
        .catch(error => {
            console.error('Error al verificar la sesión:', error);
            loginStatus.innerHTML = '<a href="../loguearse/index.html">Registrarse</a>';
        });
});