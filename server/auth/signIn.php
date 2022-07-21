<?php 
// Path: server\database\database.php
// Use the database connection from the database.php file:
// <?php
include_once './../classes/database.php';

class SignIn {
    // Get the database connection
    public function getConnection() {
        $database = new Database();
        $db = $database->getConnection();
        return $db;
    } // end getConnection
    
    // Check if the user is in the database
    public function checkUser($username, $password) {
        $db = $this->getConnection();
        $query = "SELECT * FROM users WHERE username = :username AND password = :password";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $password);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $User = new User($result['username'], $result['password'], $result['email'], $result['first_name'], $result['last_name'], $result['avatar'], $result['role']);
        } else {
        } // end if/else
    } // end checkUser
} // end SignIn
