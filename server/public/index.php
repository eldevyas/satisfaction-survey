<?php



use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Tuupola\Middleware\JwtAuthentication as JwtAuthentication;
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

include("../classes/user.php");

require '../vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Credentials: true');    

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();
// $secret = $_ENV['JWT_SECRET'];
// Intialize Slim Framework with the following parameters
$config['displayErrorDetails'] = true; // Set to true to display error details - Suitable for development only
$config['addContentLengthHeader'] = false; // Allow the web server to send the content-length header

// Create the database connection credentials
$config['db']['host']   = 'localhost';
$config['db']['user']   = 'root';
$config['db']['pass']   = '';
$config['db']['dbname'] = 'survey';

$app = new \Slim\App(['settings' => $config]);

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$payload = [
    "sub" => "user@example.com"
];


$app->add(new JwtAuthentication([
    "path" => "/api",
    "passthrough" => "/v0/displayUsers",
    "secure" => false,
    "relaxed" => ["localhost:3000", "127.0.0.1:3000"],
    "secret" => $_ENV['JWT_SECRET']
]));


// Get the container of the application
$container = $app->getContainer();


// Add the Logger dependency to the container
$container['logger'] = function($c) {
    $logger = new \Monolog\Logger('my_logger');
    $file_handler = new \Monolog\Handler\StreamHandler('../logs/app.log');
    $logger->pushHandler($file_handler);
    return $logger;
};

$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO('mysql:host=' . $db['host'] . ';dbname=' . $db['dbname'],
        $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};


// Just testing the routes
$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {    
    $name = $args['name'];
    $secret = $_ENV['JWT_SECRET'];
    $response->getBody()->write("<p style= 'color: #555; font-family: poppins;'> Hello, " . $name. ".<br/> <strong style ='margin-right: 10px'> Environement's JWT Secret Key is: </strong>" . $secret . "</p>");
    return $response;
});


// Display All the users in the database
$app->get('/api/v0/displayUsers', function (Request $request, Response $response, array $args) {
    $user = new User($this->db);

    $response->getBody()->write(json_encode($user->DisplayUsers()));

    return $response;
});

// Sign in the user with the given credentials in the POST request
$app->post('/signin', function (Request $request, Response $response) {
    $user = new User($this->db);

    $body = $request->getBody();
    $data = json_decode($body, true);

    if ($user->SignIn($data['username'], $data['password']) !== false) {
        $token = array(
            "iss" => "http://example.org",
            "aud" => "http://example.com",
            "iat" => 1356999524,
            "nbf" => 1357000000,
            "sub" => $data['username'],
            "scope" => ["read", "write", "delete"]
        );

        $jwt = JWT::encode($token, $_ENV['JWT_SECRET']);

        // Save the token
        $response->getBody()->write(json_encode(array("token" => $jwt)));
    } else {
        $response->getBody()->write("Invalid Credentials");
    }
    
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'POST');
});



$app->run();
