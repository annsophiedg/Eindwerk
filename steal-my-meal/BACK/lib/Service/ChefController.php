<?php

class ChefController {
  
  private $dbm;

  public function __construct(DBManager $dbm )
  {
      $this->dbm = $dbm;
  }


  // Get active chefs
  /**
   * chef_firstname, chef_lastname, chef_email, chef_street, chef_nr, chef_zip, chef_city, chef_telephone
   * 
   * @return array|null
   */
  function getActiveChefs()
  {
    $activeChefs = Array();

    //sql statement to get active chefs
    $sqlActiveChefs = "SELECT u.usr_firstname as chef_firstname, u.usr_lastname as chef_lastname, u.usr_email as chef_email, u.usr_street as chef_street, u.usr_housenumber as chef_nr, z.zip_zipcode as chef_zip, z.zip_city as chef_city, u.usr_telephone as chef_telephone from orders o inner join users u on o.fk_usr_chef_id = u.usr_id inner join zipcodes z on u.fk_zip_id = z.zip_id where o.fk_usr_cons_id is null group by usr_firstname, usr_lastname";

    $result = $this->dbm->sqlExecute($sqlActiveChefs, null, PDO::FETCH_OBJ);
    
    foreach ($result as $row) {
      array_push($activeChefs,$row);
    }

    return json_encode($activeChefs);
  }


  // Get one single chef
  /**
   * chef_firstname, chef_lastname, chef_email, chef_street, chef_nr, chef_zip, chef_city, chef_telephone
   * 
   * @return array|null
   */
  function getChefDetails(int $id)
  {
    //sql statement to get personal details of a chef
    $sqlChefDetails = "SELECT u.usr_firstname as chef_firstname, u.usr_lastname as chef_lastname, u.usr_email as chef_email, u.usr_street as chef_street, u.usr_housenumber as chef_nr, z.zip_zipcode as chef_zip, z.zip_city as chef_city, u.usr_telephone as chef_telephone from orders o inner join users u on o.fk_usr_chef_id = u.usr_id inner join zipcodes z on u.fk_zip_id = z.zip_id where o.fk_usr_chef_id = ".$id." group by usr_firstname, usr_lastname";

    $result = $this->dbm->sqlExecute($sqlChefDetails, null, PDO::FETCH_OBJ);
    
    //if chefDetails = null, user is not a chef!
    $chefDetails = $result;
    
    return json_encode($chefDetails);
  }

  // Get a chef rating and amount of delivered meals
  /**
   * chef_id, avg_score, delivered_meals
   * 
   * @return array|null
   */
  function getChefExperience(int $id)
  {
    //sql statement to get requested chef experience
    $sqlChefDetails = "SELECT fk_usr_chef_id, sum(rat_weight)/count(rat_weight) as avg_score, count(fk_mls_id) as delivered_meals from orders o left join ratings r on o.fk_rat_id = r.rat_id where fk_usr_chef_id = ".$id."
    group by fk_usr_chef_id";

    //fetch data from db
    $result = $this->dbm->sqlExecute($sqlChefDetails, null, PDO::FETCH_OBJ);

    $chefExperience = $result;

    return json_encode($chefExperience);
  }

  // Get all meals of one chef
  /**
   * mls_id, mls_price, mls_take_start, mls_take_end, mls_aantal
   * 
   * @return array|null
   */
  function getChefMeals(int $id)
  {
    //sql statement to get requested chef meals
    $sqlChefDetails = "SELECT mls_id, mls_name, mls_price, mls_take_start, mls_take_end, count(mls_name) as mls_aantal from meals m inner join orders o on m.mls_id = o.fk_mls_id where o.fk_usr_chef_id = ".$id." group by mls_name";

    //fetch data from db
    $result = $this->dbm->sqlExecute($sqlChefDetails, null, PDO::FETCH_OBJ);

    $chefMeals = $result;

    return json_encode($chefMeals);
  }

}

?>