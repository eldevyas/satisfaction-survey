<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");


// Read data from JSON file in data folder and store in array
$json = file_get_contents('data/questions.json');

print_r($json);

