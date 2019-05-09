<?php
require_once ('db_connection.php');

class mealController {

  function create()
  {
    // Get the posted data.
  $postdata = file_get_contents("php://input");

  if(isset($postdata) && !empty($postdata))
  {
    // Extract the data.
    $request = json_decode($postdata);


    // Validate an amount if needed.
  //   if(trim($request->number) === '' || (float)$request->amount < 0)
  //   {
  //     return http_response_code(400);
  //   }

    // Sanitize.
    // $name = mysqli_real_escape_string($con, trim($request->name));
    // $description = mysqli_real_escape_string($con, (int)$request->description);


    // Create.
    $sql = "INSERT INTO `meals`(`mls_name`,`mls_description`) VALUES ('{$name}','{$description}')";

    if(mysqli_query($con,$sql))
    {
      http_response_code(201);
      $meals = [
        'mls_name' => $name,
        'mls_description' => $description
      ];
      echo json_encode($meals);
    }
    else
    {
      http_response_code(422);
    }
  }
}

function read()
{
    /**
   * Returns the list of meals as an example.
   */
  require_once 'db_connection.php';

  $meals = [];
  $sql = "SELECT id, name, amount FROM meals";

  if($result = mysqli_query($con,$sql))
  {
    $i = 0;
    while($row = mysqli_fetch_assoc($result))
    {
      $meals[$i]['id']    = $row['id'];
      $meals[$i]['name'] = $row['name'];
      $meals[$i]['amount'] = $row['amount'];
      $i++;
    }

    echo json_encode($meals);
  }
  else
  {
    http_response_code(404);
  }
}

function update()
{
    // Get the posted data.
  $postdata = file_get_contents("php://input");

  if(isset($postdata) && !empty($postdata))
  {
    // Extract the data.
    $request = json_decode($postdata);

    // Validate an amount if needed.
  //   if ((int)$request->id < 1 || trim($request->number) == '' || (float)$request->amount < 0) {
  //     return http_response_code(400);
  //   }

    // Sanitize.
    $id    = mysqli_real_escape_string($con, (int)$request->id);
    $name = mysqli_real_escape_string($con, trim($request->name));
    $description = mysqli_real_escape_string($con, (float)$request->description);

    // Update.
    $sql = "UPDATE `meals` SET `mls_name`='$name',`mls_description`='$description' WHERE `id` = '{$id}' LIMIT 1";

    if(mysqli_query($con, $sql))
    {
      http_response_code(204);
    }
    else
    {
      return http_response_code(422);
    }  
  }
}

function delete()
{
    // Extract, validate and sanitize the id.
  $id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

  if(!$id)
  {
    return http_response_code(400);
  }

  // Delete.
  $sql = "DELETE FROM `meals` WHERE `id` ='{$id}' LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }
}

}