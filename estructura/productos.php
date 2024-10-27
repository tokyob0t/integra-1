<?php
session_start();
include 'conex.inc';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Conexión a la base de datos remota
// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : null;

if ($categoria) {
    $stmt = $conn->prepare("SELECT nombre, precio, categoria, imagen, stock FROM tabla_de_productos_de_la_tienda WHERE categoria = ?");
    $stmt->bind_param("s", $categoria);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $sql = "SELECT nombre, precio, categoria, imagen, stock FROM tabla_de_productos_de_la_tienda";
    $result = $conn->query($sql);
}

$productos = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

$conn->close();

echo json_encode($productos);
?>
