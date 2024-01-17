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

// $foto = $_POST['img'];

// foreach($_POST as $i) {
//     //$data[$key] = mysqli_real_escape_string($connexio, $value);
//     $foto = $i;
// }

$imgBase64 = $data['img'];
$idUsuari = 1;
$likes = 0;

$sql = "INSERT INTO publicaciones ( idUsuari, dataPublicacio, likes, img) VALUES (?, NOW(), ?, ?)";
$stmt = mysqli_prepare($connexio, $sql);
mysqli_stmt_bind_param($stmt, "iss", $idUsuari, $likes, $imgBase64);
mysqli_stmt_execute($stmt);
