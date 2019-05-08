<?php
require_once 'db_connection.php';

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