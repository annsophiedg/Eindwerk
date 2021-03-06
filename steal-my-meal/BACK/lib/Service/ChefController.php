<?php

class ChefController {
  
  private $dbm;

  public function __construct(DBManager $dbm )
  {
      $this->dbm = $dbm;
  }


  // Get active chefs
  /**
   * chef_firstname
   * chef_lastname
   * chef_email
   * chef_street
   * chef_nr
   * chef_zip
   * chef_city
   * chef_telephone
   * 
   * @return string|null
   */
  function getActiveChefs($id)
  {
    $activeChefs = Array();
    //sql statement to get active chefs
    $sqlActiveChefs = "CALL getActiveChefs('".$id."')";

    $result = $this->dbm->sqlExecute($sqlActiveChefs, null, PDO::FETCH_OBJ);

    foreach ($result as $row) {
      array_push($activeChefs,$row);
    }
    
    return json_encode($activeChefs);
  }


  /**
   * Get details of one single chef
   *
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
   * mls_cooked: amount of (different cooked meals)
   * ord_finished: orders that were picked up
   * avg_rating: average of all order ratings
   * 
   * @return string|null
   */
  function getChefDetails(string $id)
  {
    //sql statement to get personal details of a chef
    $sqlChefDetails = "call getChefDetailsAndExperience (".$id.")";

    $result = $this->dbm->sqlExecute($sqlChefDetails, null, PDO::FETCH_OBJ);
    
    //if chefDetails = null, user is not a chef!
    $chefDetails = $result[0];
    
    return json_encode($chefDetails);
  }

  /**
   * Get all meals of one chef (MEAL HISTORY)
   *
   * mls_id
   * mls_name
   * mls_price
   * mls_date & formatted mls_datum
   * mls_take_start
   * mls_take_end
   * mls_amount
   * 
   * @return string|null
   */
  function getChefMeals(string $id)
  {
    //sql statement to get requested chef meals
    $sqlChefDetails = "CALL getChefMeals(".$id.")";

    //fetch data from db
    $result = $this->dbm->sqlExecute($sqlChefDetails, null, PDO::FETCH_OBJ);

    $chefMeals = $result;

    return json_encode($chefMeals);
  }

}

?>