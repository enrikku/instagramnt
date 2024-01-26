<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include 'connexio.php';
// Conecta a la base de datos.
$connexio = mysqli_connect($servidor, $user, $pwd, $bbdd);
if (!$connexio) {
    exit('No es posible conectar:' . mysqli_connect_error());
}

$data = json_decode(file_get_contents("php://input"), true);

$idPublicacio = $data['idPublicacio'];
$username = $data['username'];
$comentario = $data['comentario'];


$sqlSaberIdUsername = "SELECT idUsuari FROM usuaris WHERE Username = ?";

$stmtSaberIdUsername = mysqli_prepare($connexio, $sqlSaberIdUsername);
mysqli_stmt_bind_param($stmtSaberIdUsername, "s", $username);
mysqli_stmt_execute($stmtSaberIdUsername);

mysqli_stmt_bind_result($stmtSaberIdUsername, $idUsuari);


mysqli_stmt_fetch($stmtSaberIdUsername);
mysqli_stmt_close($stmtSaberIdUsername);


$sql = "INSERT INTO comentarios (idPublicacio, idUsuari, comentari) VALUES (?, ?, ?)";
$stmt = mysqli_prepare($connexio, $sql);
mysqli_stmt_bind_param($stmt, "sss", $idPublicacio, $idUsuari, $comentario);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);
        
