<?php 

// Connect to the database server and select the database to use (SURVEY)
// PDO
$db = new PDO('mysql:host=localhost;dbname=SURVEY', 'root', '');

// if ($db) {
//     echo "Connected to the database server";
// } else {
//     echo "Failed to connect to the database server";
// }