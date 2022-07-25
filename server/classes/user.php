<?php

// User class for the authentication - This class will be used to create a new user and authenticate the user or to update the user's details and to delete the user from the database


class User {
    // Constructor
    public function __construct($db) {
        $this->db = $db;
    }

    public function call()
    {
        $this->next->call();
    }

    public function testApp(){
        return "this is my sample data";
    }

    public function DisplayUsers() {
        $sql = "SELECT * FROM user";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            return $result;
        } else {
            return false;
        }
    }

    public function SignIn( $username, $password ) {
        $sql = "SELECT * FROM user WHERE username = :username OR email = :username AND password = :password";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            return $result;
        } else {
            return false;
        }
    }
}