<?php

class UserController {
  
  private $dbm;

  public function __construct(DBManager $dbm )
  {
    $this->dbm = $dbm;
  }

  // Get overview of users
  /**
   * @return array|null
   */
  function getUserOverview()
  {
    $users = Array();

    // sql statement to get available users
    $sql = "select * from users u inner join zipcodes z on u.fk_zip_id = z.zip_id";
    // execute sql statement
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);
    
    //save results in array users 
    foreach ($result as $row) {
      array_push($users,$row);
    }
    
    return json_encode($users);
  }

  // Get a single user
  /**
   * usr_id, usr_firstname, usr_lastname, ..., zip_zipcode, zip_city
   * 
   * @return array|null
   */
  function getUserDetails(int $id)
  {
    //sql statement to get requested user details
    $sql = "SELECT * from users u inner join zipcodes z on u.fk_zip_id = z.zip_id where usr_id = ".$id;

    //fetch data from db
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    $user = $result;

    return json_encode($user);
  }

  //get a users allergies
  /**
   * all_name
   * 
   * @return array|null
   */
  function getUserAllergies($id){
    $sqlUserAllergies = "select all_name from users u
    inner join `users/allergies` `u/a` on u.usr_id = `u/a`.fk_usr_id
    inner join allergies a on `u/a`.fk_all_id = a.all_id
    where usr_id=".$id;

    //fetch data from db
    $result = $this->dbm->sqlExecute($sqlUserAllergies, null, PDO::FETCH_OBJ);

    $allergies = $result;

    return json_encode($allergies);
  }

  //UNDERNEATH STILL TO FIX SQL!! ----------------

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
  function deleteUser($id){
    $user = json_decode( file_get_contents("php://input") );
    
    $name = $user->naam;

    $sql = "DELETE from users WHERE usr_id=$id";
    //insert data in db
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    
    return $message;
  }

}

?>