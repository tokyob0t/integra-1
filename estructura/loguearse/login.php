<?php

$servername = 'localhost';
$username = 'tokyob0t';
$password = '31415926535';

$conn = new mysqli($servername, $username, $password, 'integra-1');
session_start();

try {
    if ($conn->connect_error) {
        die('Error de conexión: ' . $conn->connect_error);
    }

    $tables = $conn->query('SHOW TABLES');

    if (!$tables) {
        throw new Exception('Query failed: ' . $conn->error);
    } else {
        while ($row = $tables->fetch_assoc()) {
            foreach ($row as $clave => $valor) {
                echo "Clave: $clave, Valor: $valor\n";
            }
        }
    }
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
} finally {
    if ($conn !== null) {
        $conn->close();
    }
}

?>
