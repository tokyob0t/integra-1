<?php
include 'conex.inc'; // Asegúrate de que la conexión a la base de datos esté correcta

// Verificar si el formulario fue enviado correctamente
if ($_SERVER['REQUEST_METHOD'] == 'POST') { 
    // Verificar si los campos del formulario no están vacíos
    if (!empty($_POST['nombre']) && !empty($_POST['telefono']) && !empty($_POST['correo']) && !empty($_POST['direccion']) && !empty($_POST['contrasena'])) {
        // Limpiar los datos ingresados por el usuario
        $username = mysqli_real_escape_string($conn, trim($_POST['nombre']));
        $telefono = mysqli_real_escape_string($conn, trim($_POST['telefono']));
        $direccion = mysqli_real_escape_string($conn, trim($_POST['direccion']));
        $email = mysqli_real_escape_string($conn, trim($_POST['correo']));
        $contrasena = mysqli_real_escape_string($conn, trim($_POST['contrasena']));
        
        // Consulta SQL para insertar los datos
        $consulta = "INSERT INTO tabla_usuarios (nombre, telefono, direccion, correo, contrasena) VALUES ('$username', '$telefono', '$direccion', '$email', '$contrasena')";
        
        // Ejecutar la consulta
        $resultado = mysqli_query($conn, $consulta);
        
        // Verificar si la inserción fue exitosa
        if ($resultado) {
            echo "<h3 class='ok'>¡Te has registrado correctamente!</h3>";
            
            // Realizar una consulta para obtener todos los registros de la tabla "tabla_usuarios"
            $consulta_todos = "SELECT * FROM tabla_usuarios";
            $resultado_todos = mysqli_query($conn, $consulta_todos);
            
            // Verificar si hay registros y mostrarlos en una tabla
            if (mysqli_num_rows($resultado_todos) > 0) {
                echo "<h3>Datos registrados en la base de datos:</h3>";
                echo "<table border='1'>
                        <tr>
                            <th>Correo</th>
                            <th>Nombre</th>
                            <th>Contraseña</th>
                            <th>Direccion</th>
                            <th>Telefono</th>
                        </tr>";
                
                // Mostrar cada registro en la tabla
                while ($row = mysqli_fetch_assoc($resultado_todos)) {
                    echo "<tr>
                            <td>{$row['correo']}</td>
                            <td>{$row['nombre']}</td>
                            <td>{$row['contrasena']}</td>
                            <td>{$row['direccion']}</td>
                            <td>{$row['telefono']}</td>
                          </tr>";
                }
                
                echo "</table>";
            } else {
                echo "<h3>No hay registros en la base de datos.</h3>";
            }
        } else {
            echo "<h3 class='mal'>¡Ha ocurrido un error en la base de datos!</h3>";
            echo "Error: " . mysqli_error($conn); // Mostrar error de la base de datos
        }
    } else {
        echo "<h3 class='mal'>¡Por favor, complete todos los campos!</h3>";
    }
}

// Cerrar la conexión
mysqli_close($conn);
?>