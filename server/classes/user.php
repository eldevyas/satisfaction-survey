<?php

// User class

class User {

    public $id;
    public $username;
    public $password;
    public $email;
    public $name;
    public $avatar;
    public $role;

    public function __construct($id, $username, $password, $email, $name, $avatar, $role) {
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
        $this->email = $email;
        $this->name = $name;
        $this->avatar = $avatar;
        $this->role = $role;
    } // end __construct

    
}