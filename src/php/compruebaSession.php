<?php
header('Access-Control-Allow-Origin: *');
$username = $_GET['username'];

if (!isset($_COOKIE['username'])) {
    // header('Location: http://localhost:4200/sigin/');
    echo json_encode(['status' => 'fail', 'message' => 'usuario no registrado']);
} 
