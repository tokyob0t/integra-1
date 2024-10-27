<?php
session_start();

// Ejemplo
// fetch(sessionCheckURL)
// 	.then((r) => r.json())
// 	.then((data) => {
// 		if (data.status == "logged_out") return;
// 		if (data.status == "logged_in") alert(data.name);
// 	});

if (isset($_SESSION['correo'])) {
    echo json_encode([
        'status' => 'logged_in',
        'correo' => $_SESSION['correo'],
        'nombre' => $_SESSION['nombre'],
        'direccion' => $_SESSION['direccion'],
        'telefono' => $_SESSION['telefono'],
        'tipo_usuario' => $_SESSION['tipo_usuario']
    ]);
} else {
    echo json_encode(['status' => 'logged_out']);
}

?>
