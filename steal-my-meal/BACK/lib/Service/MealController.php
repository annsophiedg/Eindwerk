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

  function getTypes(){

    $types = Array();

    $sql = "select * from types";

    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    foreach ($result as $row) {
      array_push($types,$row);
    }

    return json_encode($types);

  }

  // Add a single meal to DB
  function addMeal($content){
    
    $decoded = json_decode($content, true);

    // Take time out of timestamp
    $startTime = substr($decoded["startTime"], 11, -10);
    $endTime = substr($decoded["startTime"], 11, -10);

    //Function to create multiple rows in order table for each portion
    function createOrders($portions, $usrId){
      $string;
      for($x=1; $x<=$portions; $x++){
        if($portions == $x){ $string .="( '".$usrId."', LAST_INSERT_ID() );";}
        else{ $string .="( '".$usrId."', LAST_INSERT_ID() ),";}
      };
      return $string;
    };

    //get number from string portions
    $portions = (int) filter_var($decoded["portions"], FILTER_SANITIZE_NUMBER_INT);

    //Use MySql transaction for inserting meals_id to order table, all with same meals_id
    $orderSqlCommand = "BEGIN;
                        INSERT INTO meals (mls_id, mls_name, mls_description, mls_price, mls_take_start, mls_take_end, mls_date, fk_typ_id)
                        VALUES( NULL,'".$decoded["name"]."', '".$decoded["description"]."', '".$decoded["price"]."', '".$decoded["startTime"]."', '".$decoded["endTime"]."', '".$decoded["date"]."', '".$decoded["type"]."');
                        INSERT INTO orders (fk_usr_chef_id, fk_mls_id) VALUES".createOrders($portions, $decoded["usrId"])."COMMIT;";

    $orderMealResult = $this->dbm->sqlExecute($orderSqlCommand, null, PDO::FETCH_OBJ);

    // //loop through sql for every portion
    // for($x=0; $x<$portions; $x++){
    //   $orderSql = "insert into orders (fk_usr_chef_id) values ('".$decoded["usrId"]."')";

    //   $orderResult = $this->dbm->sqlExecute($orderSql, null, PDO::FETCH_OBJ);
    // };

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