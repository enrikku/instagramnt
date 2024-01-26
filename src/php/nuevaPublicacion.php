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



$imgBase64 = $data['img'];
//$idUsuari = 1;
$likes = 0;

$username = $data['username'];



$sqlSaberIdUsername = "SELECT idUsuari FROM usuaris WHERE Username = ?";
//$username ="Enr";
$stmtSaberIdUsername = mysqli_prepare($connexio, $sqlSaberIdUsername);
mysqli_stmt_bind_param($stmtSaberIdUsername, "s", $username);
mysqli_stmt_execute($stmtSaberIdUsername);

mysqli_stmt_bind_result($stmtSaberIdUsername, $idUsuari);

// Recupera el resultado
mysqli_stmt_fetch($stmtSaberIdUsername);
mysqli_stmt_close($stmtSaberIdUsername);




$sql = "INSERT INTO publicaciones ( idUsuari, dataPublicacio, likes, img) VALUES (?, NOW(), ?, ?)";
$stmt = mysqli_prepare($connexio, $sql);
mysqli_stmt_bind_param($stmt, "iss", $idUsuari, $likes, $imgBase64);
mysqli_stmt_execute($stmt);
