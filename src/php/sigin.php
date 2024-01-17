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

// session_start();
// setcookie('username', 'Enric', time() + 3600, 'http://localhost:4200/sigin');

// Obtiene los valores del formulario de inicio de sesión que a puesto en los inputs
$username = mysqli_real_escape_string($connexio, $_GET['username']); // Eva
$password = mysqli_real_escape_string($connexio, $_GET['password']); // Eva

// Desencripta la contraseña.
// Selecciona la contrasenya encriptada de la base de datos segun el usuario del input "Eva"
$sqlContraseñaEcnriptada = "SELECT Password FROM usuaris WHERE Username = ?";
$stmtContraseñaEcnriptada = mysqli_prepare($connexio, $sqlContraseñaEcnriptada);
mysqli_stmt_bind_param($stmtContraseñaEcnriptada, "s", $username);
mysqli_stmt_execute($stmtContraseñaEcnriptada);
$resultContraseñaEcnriptada = mysqli_stmt_get_result($stmtContraseñaEcnriptada);

// Pillamos la contrasenya encriptada de la base de datos
if ($resultContraseñaEcnriptada->num_rows > 0) {
    $row = $resultContraseñaEcnriptada->fetch_assoc();
    $passwordEncriptada = $row['Password'];
}


// Si la contraseña input "Eva" es igual a la contraseña encryptada "saidgneignern" entra
if (password_verify($password, $passwordEncriptada)) {
    // Hacemos una segunda consulta para comprobar si el usuario y contrasenya son correctos (utilizando la constrañeya encriptada).
    $sql = "SELECT * FROM usuaris WHERE Username = ? AND Password = ?";
    $stmt = mysqli_prepare($connexio, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $username, $passwordEncriptada);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    // Comprueba si hay al menos un resultado.
    if (mysqli_num_rows($result) > 0) {
        // Si hay coincidencia, el inicio de sesión es exitoso.
        echo json_encode(['status' => 'success', 'message' => 'SignIn correcto.']);
    }
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(['status' => 'fail', 'message' => 'Usuario o contraseña incorrectas.']);
}


mysqli_stmt_close($stmtContraseñaEcnriptada);
mysqli_close($connexio);
