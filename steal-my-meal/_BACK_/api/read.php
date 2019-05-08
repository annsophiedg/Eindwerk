<?php
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