<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");



$servername = "localhost";
$username = "root";
$password = "";
$dbname = "intra";

$conn = new mysqli($servername, $username, $password, $dbname);


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

$tabla_de_productos_de_la_tienda = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $tabla_de_productos_de_la_tienda[] = $row;
    }
}

$conn->close();

echo json_encode($tabla_de_productos_de_la_tienda);
?>