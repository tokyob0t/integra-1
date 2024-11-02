<?php
session_start();
include 'conn.php'; // Asegúrate de que la conexión a la base de datos esté bien configurada

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Verificar si el usuario está autenticado
if (!isset($_SESSION['usuario_id'])) {
    echo "<p>Sin ítems</p>";
    exit;
}

// Obtener el `usuario_id` de la sesión
$usuario_id = $_SESSION['usuario_id'];

// Consultar los productos del carrito para el `usuario_id` actual
$stmt = $conn->prepare("SELECT tp.nombre, tp.precio, tp.imagen, c.total_carrito 
                        FROM carrito c 
                        JOIN tabla_de_productos_de_la_tienda tp ON c.ID_producto = tp.ID_producto 
                        WHERE c.usuario_id = ?");
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si hay productos en el carrito
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<div class='item-carrito'>";
        echo "<img src='" . htmlspecialchars($row['imagen']) . "' alt='" . htmlspecialchars($row['nombre']) . "' />";
        echo "<p>Nombre: " . htmlspecialchars($row['nombre']) . "</p>";
        echo "<p>Precio: $" . number_format($row['precio'], 2) . "</p>";
        echo "<p>Total en carrito: " . (int)$row['total_carrito'] . "</p>";
        echo "</div>";
    }
} else {
    echo "<p>Sin ítems</p>";
}

$conn->close();
?>