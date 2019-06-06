<?php

class AdminController {

    private $dbm;

    public function __construct(DBManager $dbm )
    {
        $this->dbm = $dbm;
    }

    // Get overview of admin
  /**
   * @return array|null
   */
  function getAdminOverview()
  {
    $admin = Array();

    // sql statement to get admin
    $sql = "select * from admin";
    // execute sql statement
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);
    
    //save results in array admin 
    foreach ($result as $row) {
      array_push($admin,$row);
    }
    
    return json_encode($admin);
  }

  function addAdmin($admin)
  {

    $name_values = Array();

    foreach($admin as $field => $value){
      if($field == "adm_password_check") {unset($admin[$field]);}
      $name_values[] = "$field = '" . $value . "'" ;
    }

    // $sql = "insert into admin SET adm_firstname= ".$name_values."; ";
    $sql = "insert into admin SET " . implode(", ", $name_values).";";

    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

  }


}

?>