<?php

class ExperienceController {
  
  private $dbm;

  public function __construct(DBManager $dbm )
  {
      $this->dbm = $dbm;
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

  function getNumberOfCompletedOrders(int $id) {
      $sqlCompletedOrders = "SELECT count(*) as completedOrders FROM orders WHERE fk_usr_cons_id IS NOT null AND fk_usr_chef_id = " .$id;

      //fetch data from db
      $result = $this->dbm->sqlExecute($sqlCompletedOrders, null, PDO::FETCH_OBJ);

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
    $sqlChefDetails = "SELECT mls_id, mls_name, mls_price, mls_date, DATE_FORMAT(STR_TO_DATE(mls_date,'%Y-%m-%d'), '%d-%m-%Y') as mls_datum, mls_take_start, mls_take_end, count(mls_name) as mls_amount from meals m inner join orders o on m.mls_id = o.fk_mls_id where o.fk_usr_chef_id = ".$id." group by mls_name order by mls_date";

    //fetch data from db
    $result = $this->dbm->sqlExecute($sqlChefDetails, null, PDO::FETCH_OBJ);

    $chefMeals = $result;

    return json_encode($chefMeals);
  }

}

?>