<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "inventario_integra";

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : null;

if ($categoria) {
    $stmt = $conn->prepare("SELECT nombre, precio, categoria, imagen, mostrar_carrito FROM productos WHERE categoria = ?");
    $stmt->bind_param("s", $categoria);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $sql = "SELECT nombre, precio, categoria, imagen, mostrar_carrito FROM productos";
    $result = $conn->query($sql);
}

$productos = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

$conn->close();

echo json_encode($productos);
?>

