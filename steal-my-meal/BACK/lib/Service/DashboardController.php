<?php

class DashboardController {

    private $dbm;

    public function __construct(DBManager $dbm )
    {
        $this->dbm = $dbm;
    }

    //----ADMIN TABLE

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

  // Add admin
  function addAdmin($admin)
  {

    $name_values = Array();
    
    // Unset the password check
    if(isset( $admin["adm_password_check"] )){
        unset($admin["adm_password_check"]);
    }

    foreach($admin as $field => $value){
        if($field == "adm_password") { $value = hash('md5', $value); };
      $name_values[] = "$field = '" . $value . "'" ;
    }

    $sql = "insert into admin SET " . implode(", ", $name_values).";";

    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

  }

  function deleteAdmin($id){

    $sql = "DELETE from admin where adm_id=".$id.";";

    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

  }

  function updateAdmin($id, $admin){

    $name_values = Array();

    foreach($admin as $field => $value){
      $name_values[] = "$field = '" . $value . "'" ;
    }

    $sql = "UPDATE admin SET " . implode(", ", $name_values)." WHERE adm_id=".$id.";";

    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

  }

   //----USERS TABLE


  // Add User for dashboard

  function addUser($user){

    $name_values = Array();

    foreach($user as $field => $value){
      $name_values[] = "$field = '" . $value . "'" ;
    }

    // $sql = "insert into users SET usr_id='".$user["usr_id"]."'";
    $sql = "insert into users SET " . implode(", ", $name_values).";";
    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

  }


}

?>