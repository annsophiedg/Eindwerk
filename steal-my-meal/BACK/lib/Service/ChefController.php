<?php
//require_once ('db_connection.php');

class ChefController {
  
  private $dbm;

  public function __construct(DBManager $dbm )
  {
      $this->dbm = $dbm;
  }

  // Get available meals
  function getChefOverview()
  {
    $chefs = Array();

    // $sql = "select * from users";
    //sql statement to get available meals
    $sqlAvailableChefs = "SELECT *, count(fk_mls_id) as available_portions from meals m inner join orders o ON o.fk_mls_id = m.mls_id inner join users u on o.fk_usr_chef_id = u.usr_id where fk_usr_cons_id is null group by fk_mls_id";

    $result = $this->dbm->sqlExecute($sqlAvailableChefs, null, PDO::FETCH_OBJ);
    
    foreach ($result as $row) {
      array_push($chefs,$row);
    }
    return json_encode($chefs);;
  }

  // Get a single meal
  function getChefDetails($id)
  {
    //sql statement to get requested chef details
    $sql = "SELECT * from users u inner join orders o on u.usr_id = o.fk_usr_chef_id inner join ratings r on o.fk_rat_id = r.rat_id WHERE usr_id = ".$id;

    //fetch data from db
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    $meal = json_encode($result);

    return $meal;
  }

}

?>