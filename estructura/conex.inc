<?php
$host = "mysql.inf.uct.cl";
$user = "kparra";
$password = "m3TWteSr*jnHpvHy7";
$dbname = "A2023_kparra";

$conn = mysqli_connect($host, $user, $password, $dbname);

if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}
?>
