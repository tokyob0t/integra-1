<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); // Activa informes de error detallados

include 'conex.php';

try {
    // Verificar si el formulario fue enviado
    if ($_SERVER["REQUEST_METHOD"] == "POST") { 
        if (!empty($_POST['nombre']) && !empty($_POST['telefono']) && !empty($_POST['direccion']) && !empty($_POST['correo']) && !empty($_POST['contrasena'])) {
            
            // Limpiar los datos ingresados por el usuario
            $nombre = trim($_POST['nombre']);
            $telefono = trim($_POST['telefono']);
            $direccion = trim($_POST['direccion']);
            $email = trim($_POST['correo']);
            $contrasena = trim($_POST['contrasena']);
            $usertype = 'Usuario';
            
            // Preparar la consulta con prepared statements
            $consulta = $conn->prepare("INSERT INTO tabla_usuarios (correo, nombre, contrasena, direccion, telefono, Tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)");
            
            // Vincular los parámetros
            $consulta->bind_param("ssssss", $email, $nombre, $contrasena, $direccion, $telefono, $usertype);
            
            // Ejecutar la consulta y verificar si fue exitosa
            if ($consulta->execute()) {
                echo "<script>
                    alert('Â¡Te has registrado correctamente!');
                    window.location.href = 'index.html'; // Redirige al index principal
                  </script>";
            } else {
                echo "<script>
                    alert('Â¡Error en la base de datos! " . mysqli_error($conn) . "');
                    window.location.href = '../index.html'; // Redirige al index principal en caso de error
                  </script>";
            }
            
            // Cerrar la consulta
            $consulta->close();
        } else {
            echo "<h3 class='mal'>¡Por favor, complete todos los campos!</h3>";
        }
    }
} catch (Exception $e) {
    echo "<h3 class='mal'>Excepción capturada: " . $e->getMessage() . "</h3>";
}

// Cerrar la conexión
mysqli_close($conn);
?>
