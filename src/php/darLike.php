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

// $foto = $_POST['img'];

// foreach($_POST as $i) {
//     //$data[$key] = mysqli_real_escape_string($connexio, $value);
//     $foto = $i;
// }


$sqlSaberIdUsername = "SELECT idUsuari FROM usuaris WHERE Username = ?";
//$username ="Enr";
$stmtSaberIdUsername = mysqli_prepare($connexio, $sqlSaberIdUsername);
mysqli_stmt_bind_param($stmtSaberIdUsername, "s", $username);
mysqli_stmt_execute($stmtSaberIdUsername);

mysqli_stmt_bind_result($stmtSaberIdUsername, $idUsuari);

// Recupera el resultado
mysqli_stmt_fetch($stmtSaberIdUsername);
mysqli_stmt_close($stmtSaberIdUsername);


$puedeDarLike = false;
$sqlSaberADadoLike = "SELECT * FROM likes WHERE idPublicacio = ? AND idUsuari = ?";
$stmtSaberADadoLike = mysqli_prepare($connexio, $sqlSaberADadoLike);

mysqli_stmt_bind_param($stmtSaberADadoLike, "ss", $idPublicacio, $idUsuari);
mysqli_stmt_execute($stmtSaberADadoLike);
mysqli_stmt_store_result($stmtSaberADadoLike);

// Verificar el número de filas devueltas
if (mysqli_stmt_num_rows($stmtSaberADadoLike) > 0) {
    $puedeDarLike = false;
} else {
    $puedeDarLike = true;
}

mysqli_stmt_close($stmtSaberADadoLike);

if($puedeDarLike){
    $sql = "INSERT INTO likes (idPublicacio, idUsuari) VALUES (?, ?)";
    $stmt = mysqli_prepare($connexio, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $idPublicacio, $idUsuari);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
        
}
