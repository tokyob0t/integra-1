<?php

$host = "localhost";
$user = "root";
$password = "";
$dbname = "tienda_virtual";

$conn = mysqli_connect($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
} else {
    echo "ok"; 
}
?>