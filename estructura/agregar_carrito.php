<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


include 'conex.inc';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = 'prueba@prueba';
    $total_carrito = 1;
    $ID_producto = $_POST['ID_producto'];

    if (empty($ID_producto)) {
        echo "Error: ID de producto no recibido";
        exit;
    }

    $sql = "INSERT INTO carrito (correo, total_carrito, ID_producto) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sii", $correo, $total_carrito, $ID_producto);

    if ($stmt->execute()) {
        echo "Elemento agregado correctamente";
    } else {
        echo "Error al agregar el elemento: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Método no permitido";
}
