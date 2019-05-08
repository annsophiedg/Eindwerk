<?php
require_once 'db_connection.php';

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
  $name = mysqli_real_escape_string($con, trim($request->name));
  $description = mysqli_real_escape_string($con, (int)$request->description);


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