<?php

session_start();

include 'conn.php';

$conn = new mysqli($db_servername, $db_username, $db_password, 'integra-1');

try {
    if ($conn->connect_error) {
        die('Error de conexión: ' . $conn->connect_error);
    }

    if (isset($_POST['_c']) && isset($_POST['_p'])) {
        $correo = $conn->real_escape_string($_POST['_c']);
        $password = $conn->real_escape_string($_POST['_p']);

        $result = $conn->query(
            "SELECT * FROM tabla_usuarios WHERE correo='$correo' AND contrasena='$password'"
        );

        if (!$result) {
            throw new Exception('Error en la consulta: ' . $conn->error);
        }

        if ($result->num_rows > 0) {
            $usuario = $result->fetch_assoc();

            $_SESSION['correo'] = $usuario['correo'];
            $_SESSION['nombre'] = $usuario['nombre'];
            $_SESSION['direccion'] = $usuario['direccion'];
            $_SESSION['telefono'] = $usuario['telefono'];
            $_SESSION['tipo_usuario'] = $usuario['Tipo_usuario'];

            echo json_encode(['status' => 'success', 'message' => 'Usuario encontrado']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado']);
        }
    } else {
        throw new Exception('Faltan parámetros');
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
} finally {
    if ($conn !== null) {
        $conn->close();
    }
}
?>
