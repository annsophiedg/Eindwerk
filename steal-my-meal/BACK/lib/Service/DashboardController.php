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

  // Delete admin
  function deleteAdmin($id){

    $sql = "DELETE from admin where adm_id=".$id.";";

    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

  }

  // Update admin
  function updateAdmin($id, $admin){

    $name_values = Array();

    foreach($admin as $field => $value){
      $name_values[] = "$field = '" . $value . "'" ;
    }

    $sql = "UPDATE admin SET " . implode(", ", $name_values)." WHERE adm_id=".$id.";";

    $result = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

  }

   //----STATISTICS TABLE

  // Get statistics
  function getStatistics(){

    $sql = "SELECT 
               (select count(adm_id) from admin) as NumberOfAdmin,
               (select count(usr_id) from users) as NumberOfUsers,
               (select count(mls_id) from meals) as NumberOfMeals,
               (select count(ing_id) from ingredients) as NumberOfIngredients,
               (select count(fk_mls_id) from orders ) as TotalPortions,
               (select count(*) from (select count(fk_usr_id) from followers GROUP BY fk_usr_id) as followers) as NumberOfFollowers,
               (select count(*) from (select count(fk_usr_chef_id) from followers GROUP BY fk_usr_chef_id) as followers) as NumberOfFollowedChefs,
               (select count(fk_mls_id) from orders WHERE (fk_usr_cons_id is null or fk_usr_cons_id = '')) as AvailablePortions,
               (select count(fk_mls_id) from orders WHERE (fk_usr_cons_id is not null or fk_usr_cons_id != '')) as OrderedPortions;";
               
    $statsResult = $this->dbm->sqlExecute($sql, null, PDO::FETCH_OBJ);

    return json_encode($statsResult);
  }
};