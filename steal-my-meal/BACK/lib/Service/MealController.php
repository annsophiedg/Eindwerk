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
   * Get details of a single meal
   * @return array
   */
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
   * Get ALL ingredients from DB sorted on alphabet
   * @return array
   */
  function getDBIngredients()
  {
    //empty array to save ingredients
    $allIngredients = Array();

    //sql statement to get requested meal details
    $sql = "select * from ingredients order by ing_name";

    //fetch data from db
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    foreach ($result as $row) {
      array_push($allIngredients,$row);
    }

    return json_encode($allIngredients);
  }

  /**
   * Get ingredients of a single meal
   * ing_name
   * @return array
   */
  function getMealIngredients($id)
  {
    //empty array to save ingredients
    $mealIngredients = Array();

    //sql statement to get requested meal details
    $sql = "select ing_name from `meals/ingredients` mi
    inner join ingredients i on mi.fk_ing_id = i.ing_id
    where fk_mls_id = ".$id;

    //fetch data from db
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    foreach ($result as $row) {
      array_push($mealIngredients,$row);
    }

    return json_encode($mealIngredients);
  }

  // Add a single meal to DB
  function addMeal($content){
    
    $decoded = json_decode($content, true);

    // Take time out of timestamp
    $startTime = substr($decoded["startTime"], 11, -10);
    $endTime = substr($decoded["startTime"], 11, -10);

    // Create dateTime
    $takeStart = $decoded["date"]." ".$startTime;
    $takeEnd = $decoded["date"]." ".$endTime;

    $sql = "insert into meals (mls_name, mls_description, mls_price, mls_take_start, mls_take_end)
            values ('".$decoded["name"]."', '".$decoded["description"]."', '".$decoded["price"]."', '".$takeStart."', '".$takeEnd."')";
            
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

  }

  // Add an ingredient to DB & return the ing_id
  function addIngredient($input){
    $decoded = json_decode($input, true);
    $ing_name = $decoded["ing_name"];

    $sql = "SELECT getAddedIngredientId('".$ing_name."') as id";

    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    //var_dump($result);
    echo json_encode($result);
  }
}

?>