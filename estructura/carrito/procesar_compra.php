<?php
// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root";  // Usuario de MySQL
$password = "";      // Contraseña de MySQL
$dbname = "tienda virtual";  // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener y sanitizar los datos del formulario
    $nombre = trim($_POST['nombre']);
    $direccion = trim($_POST['direccion']);
    $email = trim($_POST['email']);

    // Validación simple
    if (empty($nombre) || empty($direccion) || empty($email)) {
        die("Error: Todos los campos son obligatorios.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Error: Formato de correo electrónico inválido.");
    }

    // Preparar la consulta SQL
    $sql = "INSERT INTO compras (nombre, direccion, email) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        die("Error al preparar la consulta: " . $conn->error);
    }

    // Asociar parámetros y ejecutar la consulta
    $stmt->bind_param("sss", $nombre, $direccion, $email);

    if ($stmt->execute()) {
        echo "Compra realizada con éxito.";
    } else {
        echo "Error al realizar la compra: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>