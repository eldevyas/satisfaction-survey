<?php 

// Database connection information
class Database {
    private $host = "localhost";
    private $db_name = "survey";
    private $username = "root";
    private $password = "";
    public $conn;
    
    // Get the database connection
    public function getConnection() {
        $this->conn = null;
        
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        } // end try/catch
        
        return $this->conn;
    } // end getConnection
} // end Database