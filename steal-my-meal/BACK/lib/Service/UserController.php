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

    $userDetails = $result;

    return json_encode($userDetails);
  }

  //get a users allergies
  /**
   * ing_id, ing_name
   * @return array|null
   */
  function getUserAllergies($id){
    $sqlUserAllergies = "select ing_id, ing_name from users u
    inner join `users/allergies` `u/a` on u.usr_id = `u/a`.fk_usr_id
    inner join ingredients a on `u/a`.fk_ing_all_id = a.ing_id
    where usr_id=".$id;

    //fetch data from db
    $result = $this->dbm->sqlExecute($sqlUserAllergies, null, PDO::FETCH_OBJ);

    $allergies = $result;

    return json_encode($allergies);
  }

  //add an allergy to a user
  /**
   * all_id, all_name
   * @return array|null
   */
  function addUserAllergy($usr_id, $input) {
    $decoded = json_decode($input, true);
    $all_id = $decoded['all_id'];

    $sqlInsertUserAllergy = "INSERT INTO `users/allergies` (fk_usr_id, fk_ing_all_id)
    VALUES (".$usr_id.",".$all_id.")";

    //insert data in db
    $result = $this->dbm->sqlExecute($sqlInsertUserAllergy, null, PDO::FETCH_OBJ);
  }


  //delete allergy from a user
  /**
   * all_id, all_name
   * @return array|null
   */
  function deleteUserAllergy($usr_id, $all_id) {
    $sqlDeleteAll = "delete from `users/allergies` where fk_usr_id = ".$usr_id." and fk_ing_all_id = ".$all_id;

    //execute sql
    $result = $this->dbm->sqlExecute($sqlDeleteAll, null, PDO::FETCH_OBJ);

    return $result;
  }

  //get all allergies from DB
  /**
   * ing_id, ing_name
   * @return array|null
   */
  function getAllAllergies(){
    $sqlAllergies = "select * from allergies order by all_name";

    //fetch data from db
    $result = $this->dbm->sqlExecute($sqlAllergies, null, PDO::FETCH_OBJ);

    $allergies = $result;

    return json_encode($allergies);
  }

  //UNDERNEATH STILL TO FIX SQL!! ----------------

  // Delete user
  function deleteUser($id){
    $user = json_decode( file_get_contents("php://input") );

    $name = $user->naam;

    $sql = "DELETE from users WHERE usr_id=$id";
    //insert data in db
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);


    return json_encode($message);
  }

}

?>