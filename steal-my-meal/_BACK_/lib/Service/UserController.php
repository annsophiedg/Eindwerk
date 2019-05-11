<?php
//require_once ('db_connection.php');

class UserController {
  
  private $dbManager;

  public function __construct(DBManager $dbm )
  {
      $this->dbManager = $dbm;
  }

  /**
   * @return array
   */
  // Get overview of available users
  function getUserOverview()
  {
    $users = Array();

    // sql statement to get available users
    $sql = "select * from users";
    // execute sql statement
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);
    
    //save results in array users 
    foreach ($result as $row) {
      array_push($users,$row);
    }
    
    return $users;
  }

  /**
   * @return array
   */
  // Get a single user
  function getUserDetails($id)
  {
    //sql statement to get requested user details
    $sql = "SELECT * from users WHERE usr_id = ".$id;

    //fetch data from db
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    $user = $result;

    return $user;
  }

  // Add a single user to DB
  function addUser(){
    $sql = "INSERT INTO users SET ...";
    //insert data in db
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);
  }

  // Update user information
  function updateUser($id){
    $user = json_decode( file_get_contents("php://input") );
    
    $name = $user->naam;

    $sql = "UPDATE users SET usr_name='$name' WHERE usr_id=$id";
    //insert data in db
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);
  }

  // Delete user
  function updateUser($id){
    $user = json_decode( file_get_contents("php://input") );
    
    $name = $user->naam;

    $sql = "DELETE from users WHERE usr_id=$id";
    //insert data in db
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    
    return $message;
  }

}

?>