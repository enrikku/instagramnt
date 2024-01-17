<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'connexio.php';

// Conecta a la base de datos.
$connexio = mysqli_connect($servidor, $user, $pwd, $bbdd);
if (!$connexio) {
    exit('No es posible conectar:' . mysqli_connect_error());
}

$sql = "SELECT * FROM publicaciones ORDER BY dataPublicacio DESC";

// Ejecuta la consulta
$resultado = mysqli_query($connexio, $sql);

// Verifica si la consulta fue exitosa
if ($resultado) {
    // Inicializa un array para almacenar los datos
    $datos = array();

    // Recorre los resultados y agrega cada fila al array
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $datos[] = $fila;
    }

    // Imprime los datos en formato JSON
    echo json_encode($datos);
} else {
    // Muestra un mensaje de error si la consulta falla
    echo 'Error en la consulta: ' . mysqli_error($connexio);
}

// Cierra la conexión
mysqli_close($connexio);

