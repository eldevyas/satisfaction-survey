<?php
USE Src\System\DatabaseConnector;

class AuthUser extends DatabaseConnector {
    public function __construct() {
        parent::__construct();
    }
    
    /**
     * @return string
     */
    public function getTableName() {
        return 'user';
    }
}