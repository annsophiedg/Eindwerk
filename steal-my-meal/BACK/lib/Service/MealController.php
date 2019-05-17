<?php

class MealController {
  
  private $dbm;

  public function __construct(DBManager $dbm )
  {
      $this->dbm = $dbm;
  }

  /**
   * @return array
   */
  // Get overview of available meals
  function getMealOverview()
  {
    $meals = Array();

    //sql statement to get available meals
    // $sqlAvailableMeals = "select * from meals";
    $sqlAvailableMeals = "select *, count(fk_mls_id) as available_portions from meals m inner join orders o ON o.fk_mls_id = m.mls_id inner join users u on o.fk_usr_chef_id = u.usr_id where fk_usr_cons_id is null group by fk_mls_id";

    $result = $this->dbm->sqlExecute($sqlAvailableMeals, null, PDO::FETCH_OBJ);
    foreach ($result as $row) {
      array_push($meals,$row);
    }
    $jsonMeals = json_encode($meals);
    return $jsonMeals;
  }

  /**
   * @return array
   */
  // Get details of a single meal
  function getMealDetails($id)
  {
    //sql statement to get requested meal details joined with type
    $sql = "select * from meals m left join types t on m.fk_typ_id = t.typ_id where mls_id=".$id;

    //fetch data from db
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    $meal = $result;

    return json_encode($meal);
  }

  /**
   * @return array
   */
  // Get ingredients of a single meal
  function getMealIngredients($id)
  {
    //empty array to save ingredients
    $ingredients = Array();

    //sql statement to get requested meal details
    $sql = "select ing_name from `meals/ingredients` mi
    inner join ingredients i on mi.fk_ing_id = i.ing_id
    where fk_mls_id = ".$id;

    //fetch data from db
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    foreach ($result as $row) {
      array_push($ingredients,$row);
    }

    return json_encode($ingredients);
  }

  // Add a single meal to DB
  function addMeal(){
    
  }
}

?>