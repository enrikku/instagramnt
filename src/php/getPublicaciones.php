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

        $idPublicacion = $fila['idPublicacio'];
        $sql2 = "SELECT COUNT(*) as likes FROM likes WHERE idPublicacio = ?";
        $resultadoLikes = mysqli_prepare($connexio, $sql2);

        mysqli_stmt_bind_param($resultadoLikes, 's', $idPublicacion);
        mysqli_stmt_execute($resultadoLikes);
        mysqli_stmt_store_result($resultadoLikes);

        if (mysqli_stmt_num_rows($resultadoLikes) > 0) {
            mysqli_stmt_bind_result($resultadoLikes, $numLikes);
            mysqli_stmt_fetch($resultadoLikes);
            $fila['numLikes'] = $numLikes;
        } else {
            // No hay resultados, establecer numLikes a 0 o cualquier valor predeterminado
            $fila['numLikes'] = 0;
        }
        mysqli_stmt_free_result($resultadoLikes);
        mysqli_stmt_close($resultadoLikes);


        
        // Saber que comentarios tiene la publicacion
        $sql3 = "SELECT comentari FROM comentarios WHERE idPublicacio = ?";
        $resultadoComentarios = mysqli_prepare($connexio, $sql3);
    
        mysqli_stmt_bind_param($resultadoComentarios, 's', $idPublicacion);
        mysqli_stmt_execute($resultadoComentarios);
    
        // Almacenar los resultados
        mysqli_stmt_store_result($resultadoComentarios);
    
        if (mysqli_stmt_num_rows($resultadoComentarios) > 0) {
            mysqli_stmt_bind_result($resultadoComentarios, $comentario);
    
            // Crear un array para almacenar los comentarios asociados a la idPublicacio
            $comentariosPublicacion = array();
    
            // Iterar a través de los comentarios y añadirlos al array
            while (mysqli_stmt_fetch($resultadoComentarios)) {
                $comentariosPublicacion[] = $comentario;
            }
    
            // Añadir el array de comentarios al array principal
            $fila['comentarios'] = $comentariosPublicacion;
        } else {
            // Si no hay comentarios, establecer un array vacío
            $fila['comentarios'] = array();
        }
    
        // Liberar resultados
        mysqli_stmt_free_result($resultadoComentarios);



        $datos[] = $fila;
    }

    echo json_encode($datos);
} else {
    echo 'Error en la consulta: ' . mysqli_error($connexio);
}

mysqli_close($connexio);
