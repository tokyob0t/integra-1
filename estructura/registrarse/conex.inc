<?php

$host = "mysql.inf.uct.cl";
$user = "kparra";
$password = ":)";
$dbname = "A2023_kparra";

$conn = mysqli_connect($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
} else {
    echo "ok"; 
}
?>