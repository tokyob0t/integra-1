<?php

$host = "db.inf.uct.cl";
$user = "tu_user";
$password = "tu_contraseña";
$dbname = "nombre_base_datos";

$conn = mysqli_connect($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
} else {
    echo "ok"; 
}
?>