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
    $sqlActiveChefs = "SELECT u.usr_id, u.usr_firstname as chef_firstname, u.usr_lastname as chef_lastname, u.usr_email as chef_email, u.usr_street as chef_street, u.usr_housenumber as chef_nr, z.zip_zipcode as chef_zip, z.zip_city as chef_city, u.usr_telephone as chef_telephone, u.usr_profile_url as chef_picture from orders o inner join users u on o.fk_usr_chef_id = u.usr_id inner join zipcodes z on u.fk_zip_id = z.zip_id where o.fk_usr_cons_id is null group by usr_firstname, usr_lastname";

   
    $result = $this->dbm->sqlExecute($sqlActiveChefs, null, PDO::FETCH_OBJ);
    
    foreach ($result as $row) {

      array_push($activeChefs,json_encode($row));
    }

    $jsonChefs = json_encode($activeChefs);

    return $jsonChefs;
  }


  /**
   * Get details of one single chef
   *
   * chef_firstname
   * chef_lastname
   * chef_email
   * chef_street
   * chef_nr
   * chef_zip
   * chef_city
   * chef_telephone
   * mls_cooked: amount of (different cooked meals)
   * ord_finished: orders that were picked up
   * avg_rating: average of all order ratings
   * 
   * @return array|null
   */
  function getChefDetails(int $id)
  {
    //sql statement to get requested chef experience
    $sqlChefDetails = "call getChefDetails (".$id.")";

    //fetch data from db
      $chefDetails = $this->dbm->sqlExecute($sqlChefDetails, null, PDO::FETCH_OBJ);

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
   * @return array|null
   */
  function getChefMeals(int $id)
  {
    //sql statement to get requested chef meals
    $sqlChefDetails = "SELECT mls_id, mls_name, mls_price, mls_date, DATE_FORMAT(STR_TO_DATE(mls_date,'%Y-%m-%d'), '%d-%m-%Y') as mls_datum, mls_take_start, mls_take_end, count(mls_name) as mls_amount from meals m inner join orders o on m.mls_id = o.fk_mls_id where o.fk_usr_chef_id = ".$id." group by mls_name order by mls_date";

    //fetch data from db
    $result = $this->dbm->sqlExecute($sqlChefDetails, null, PDO::FETCH_OBJ);

    $chefMeals = $result;

    return json_encode($chefMeals);
  }

}

?>