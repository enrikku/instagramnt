<?php
/*Fitxer per recuperar tots els restaurants de la taula. Retorna en format JSON */
header('Access-Control-Allow-Origin: *');
/*Dades de connexió a base de dades.*/
include 'connexio.php';

$connexio = mysqli_connect($servidor, $user, $pwd, $bbdd);
if (!$connexio) {
    exit('No es pot connectar:' . mysqli_connect_error());
}
// echo "<p>Connexió correcta!</p>";

$sql = "Select * from usuaris";
// Executeu la consulta
$array;
$result = mysqli_query($connexio, $sql);
while ($arrayresultat = mysqli_fetch_assoc($result)) {
    $array[] = $arrayresultat;
    foreach ($arrayresultat as $codigo => $nombre) {
        $elementos_json[] = "\"$codigo\": \"$nombre\"";
    }
}
echo json_encode($array, JSON_UNESCAPED_UNICODE); //JSON_UNESCAPED_UNICODE per respectar utf8
/*Converteix el array en un json com aquest:
[
{"id":"1","nombre":"Jabugo","descripcion":"Platos de carne a la brasa","tipo":"Carne","ciudad":"Granollers","foto":"images\/jabugo.jpg"},
{"id":"2","nombre":"Fonda Europa","descripcion":"Buena paella","tipo":"Mediterránea","ciudad":"Granollers","foto":"images\/fonda.jpg"},
{"id":"3","nombre":"Montaditos","descripcion":"Buenas ofertas","tipo":"Tapas","ciudad":"Granollers","foto":"images\/fonda.jpg"}
]
 */
/* free result set */
mysqli_free_result($result);
