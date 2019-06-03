<?php

class TypeController {
  
  private $dbm;

  public function __construct(DBManager $dbm )
  {
    $this->dbm = $dbm;
  }

  // Get overview of Types
  /**
   * @return array|null
   */
  function getTypes(){

    $types = Array();

    $sql = "select * from types";

    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    foreach ($result as $row) {
      array_push($types,$row);
    }

    return json_encode($types);

  }

}

?>