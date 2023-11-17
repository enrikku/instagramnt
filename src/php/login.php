<?php
/* Fitxer per inserir un nou usuari a la taula. Retorna en format JSON */
header('Access-Control-Allow-Origin: *');
/* Dades de connexió a base de dades. */
include 'connexio.php';

$connexio = mysqli_connect($servidor, $user, $pwd, $bbdd);
if (!$connexio) {
    exit('No es pot connectar:' . mysqli_connect_error());
}

// Variables de entrada
$nombre = $_GET['nombre'];
$apellido = $_GET['apellido'];
$email = $_GET['email'];
$usernamelist = $_GET['username'];
$password = $_GET['password'];
$imatge = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'; // Define la imagen por defecto o proporciona la ruta desde el formulario

// Utiliza consultas preparadas para prevenir la inyección SQL
$sql = "INSERT INTO usuaris (Nom, Cognom, Email, Username, Password, Imatge) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($connexio, $sql);
mysqli_stmt_bind_param($stmt, "ssssss", $nombre, $apellido, $email, $usernamelist, $password, $imatge);

// Consulta para verificar si el email ya existe
$sqlEmailExiste = "SELECT * FROM usuaris WHERE Email = ?";
$stmtEmailExiste = mysqli_prepare($connexio, $sqlEmailExiste);
mysqli_stmt_bind_param($stmtEmailExiste, "s", $email);
mysqli_stmt_execute($stmtEmailExiste);
$result = mysqli_stmt_get_result($stmtEmailExiste);

// Verifica si el email ya existe en la base de datos
if (mysqli_num_rows($result) > 0) {
    echo json_encode(['status' => 'error', 'message' => 'El email ya existe.']);
    exit;
} else {
    // Si el email no existe, ejecuta la inserción del usuario
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(['status' => 'success', 'message' => 'Usuario insertado correctamente.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al insertar el usuario.']);
    }
}

// Cierra las consultas preparadas y la conexión a la base de datos
mysqli_stmt_close($stmt);
mysqli_stmt_close($stmtEmailExiste);
mysqli_close($connexio);
?>
