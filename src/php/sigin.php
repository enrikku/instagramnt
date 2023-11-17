<?php
/* Archivo para autenticar un usuario. Retorna en formato JSON */

// Permite solicitudes desde cualquier origen (CORS)
header('Access-Control-Allow-Origin: *');

/* Datos de conexión a la base de datos. */
include 'connexio.php';

// Conecta a la base de datos.
$connexio = mysqli_connect($servidor, $user, $pwd, $bbdd);
if (!$connexio) {
    exit('No es posible conectar:' . mysqli_connect_error());
}

// Obtiene los valores del formulario de inicio de sesión.
$username = mysqli_real_escape_string($connexio, $_GET['username']);
$password = mysqli_real_escape_string($connexio, $_GET['password']);

// Utiliza consultas preparadas para prevenir la inyección SQL.
$sql = "SELECT * FROM usuaris WHERE Username = ? AND Password = ?";
$stmt = mysqli_prepare($connexio, $sql);
mysqli_stmt_bind_param($stmt, "ss", $username, $password);
mysqli_stmt_execute($stmt);

// Obtiene el resultado de la consulta.
$result = mysqli_stmt_get_result($stmt);

// Comprueba si hay al menos un resultado.
if (mysqli_num_rows($result) > 0) {
    // Si hay coincidencia, el inicio de sesión es exitoso.
    echo json_encode(['status' => 'success', 'message' => 'SignIn correcto.']);
} else {
    // Si no hay coincidencia, el inicio de sesión falla.
    echo json_encode(['status' => 'fail', 'message' => 'Usuario o contraseña incorrectas.']);
}

// Cierra la declaración preparada y la conexión a la base de datos.
mysqli_stmt_close($stmt);
mysqli_close($connexio);
?>
