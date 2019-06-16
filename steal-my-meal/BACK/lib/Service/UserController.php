<?php

class UserController {
  
  private $dbm;

  public function __construct(DBManager $dbm )
  {
    $this->dbm = $dbm;
  }

  // Get overview of users
  /**
   * @return string|null
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

  /**
   * GET USER INFORMATION
   * usr_id
   * usr_firstname
   * usr_lastname
   * usr_email
   * usr_street
   * usr_housenumber
   * usr_telephone
   * usr_profile_url
   * zip_zipcode
   * zip_city
   * fk_usr_chef_id
   *
   * @return string|null
   */
  function getUserDetails(string $id)
  {
    //sql statement to get requested user details
    $sql = "call getUserDetails ('".$id."')";

    //fetch data from db
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    $userDetails = $result[0];

    return json_encode($userDetails);
  }

  /**
   * GET USER EXPERIENCE WHEN USER IS A CHEF
   * mls_cooked: amount of (different cooked meals)
   * ord_finished: orders that were picked up
   * avg_rating: average of all order ratings
   *
   * @return string|null
   */
  function getUserExperience(string $id)
  {
    //sql statement to get requested user details
    $sql = "call getUserExperience (".$id.")";

    //fetch data from db
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    $userExperience = $result[0];

    return json_encode($userExperience);
  }

  //Update User Details
    function updateUser($id,$content) {
      $decoded = json_decode($content,true);

      $firstname = $decoded["fullName"]["usr_firstname"];
      $lastname = $decoded["fullName"]["usr_lastname"];
      $street = $decoded["address"]["usr_street"];
      $housenumber = $decoded["address"]["usr_housenumber"];

      $zipcode = $decoded["address"]["zip_zipcode"];
      $city = $decoded["address"]["zip_city"];

      $new_zip = $this->getZipId($zipcode,$city);
      $new_zip_id = json_decode($new_zip)[0]->id;

      $sql = "UPDATE users SET usr_firstname = '".$firstname."', usr_lastname = '".$lastname."', usr_street = '".$street."', usr_housenumber = '".$housenumber."', fk_zip_id = '".$new_zip_id."' WHERE usr_id = ".$id;

      $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

      return $result;
    }

    function getZipId($zip,$city) {
      $sql = "select getZipId(".$zip.", '".$city."') as id";
      $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);
      return json_encode($result);
    }

  // USER ALLERGIES --------------------------------------------

  /**
   * get all user allergies
   * ing_id, ing_name
   *
   * @return string|null
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

  /**
   * add an allergy to a user
   */
  function addUserAllergy($usr_id, $input) {
    $decoded = json_decode($input, true);
    $all_id = $decoded['all_id'];

    $sqlInsertUserAllergy = "select addUserAllergy(".$usr_id.",".$all_id.")";

    //insert data in db
    $result = $this->dbm->sqlExecute($sqlInsertUserAllergy, null, PDO::FETCH_OBJ);
  }

  /**
   * delete allergy from a user
   * all_id, all_name
   *
   * @return array|null
   */
  function deleteUserAllergy($usr_id, $all_id) {
    $sqlDeleteAll = "delete from `users/allergies` where fk_usr_id = ".$usr_id." and fk_ing_all_id = ".$all_id;

    //execute sql
    $result = $this->dbm->sqlExecute($sqlDeleteAll, null, PDO::FETCH_OBJ);

    return $result;
  }

    // USER Favorite Chefs --------------------------------------------
    /**
     * chef_id
     *
     * @return string|null
     */
    function getFavoriteChefs($id){
        $sqlFavoriteChefIDs = "SELECT fk_usr_chef_id as chef_id FROM followers f WHERE fk_usr_id =".$id;

        //fetch data from db
        $result = $this->dbm->sqlExecute($sqlFavoriteChefIDs, null, PDO::FETCH_OBJ);

        $favChefIds = Array();

        foreach ($result as $i) {
            array_push($favChefIds,$i->chef_id);
        }

        return json_encode($favChefIds);
    }

    /**
     * add row in followers
     */
    function addFavoriteChef($usr_id,$chef_id){
        $sqlAddFavChef = "INSERT INTO followers (fk_usr_id, fk_usr_chef_id) VALUES  (".$usr_id.",".$chef_id.")";

        //fetch data from db
        $result = $this->dbm->sqlExecute($sqlAddFavChef, null, PDO::FETCH_OBJ);

        return json_encode($result);
    }

    /**
     * delete row in followers
     */
    function deleteFavoriteChef($usr_id,$chef_id){
        $sqlDeleteFavChef = "DELETE from followers WHERE fk_usr_id = ".$usr_id." AND fk_usr_chef_id = ".$chef_id;

        //fetch data from db
        $result = $this->dbm->sqlExecute($sqlDeleteFavChef, null, PDO::FETCH_OBJ);

        return json_encode($result);
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