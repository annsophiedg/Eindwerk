<?php

// URL
// api/chefs
// api/chefs/id

// api/meals
// api/meals/id

// api/users
// api/users/id

require __DIR__ . '/bootstrap.php';

$container = new Container($configuration);
$dbManager = $container->getDBManager();
$pdo = $dbManager->getPDO();

$request = $_SERVER["REQUEST_URI"];
$method = $_SERVER["REQUEST_METHOD"];

$parts = explode("/", $request);

if ( count($parts) > 3 ) $api = $parts[3];
if ( count($parts) > 4 ) $subject = $parts[4];
if ( count($parts) > 5 ) $id = $parts[5];

//use Service MealController if $subject == "meals"
if ( $subject == "meals" )
{
    $mealController = new MealController($dbManager);
    
    if ($method == "GET") {
        if (!$id) {
            //GET overview meals: sort on location
            $availableMeals = $mealController->getMealOverview();
            echo $availableMeals;
        } else {
            //GET meal details from meals + type
            $mealDetails = $mealController->getMealDetails($id);
            echo $mealDetails;
            print '<br>';
            //GET meal ingredients
            $ingredients = $mealController->getMealIngredients($id);
            echo $ingredients;
            print '<br>';
        }
    } else if ($method == "POST") {

    }
}

//use Service ChefController if $subject == "chefs"
if ( $subject == "chefs" )
{
    $chefController = new ChefController($dbManager);
    
    if ($method == "GET") {
        if (!$id) {
            //GET overview chefs: sort on location
            $chefs = $chefController->getChefOverview();
            var_dump($chefs);
        } else {
            //GET chef details
            $chefDetails = $chefController->getChefDetails($id);
            var_dump($chefDetails);
        }
    }    
}

//use Service UserController if $subject == "users"
if ( $subject == "users" )
{
    $userController = new UserController($dbManager);
    
    if ($method == "GET") {
        if (!$id) {
            //GET overview users: only as admin!!
            $users = $userController->getUserOverview();
            var_dump($users);
        } else {
            //GET profile (user details)
            $userDetails = $userController->getUserDetails($id);
            var_dump($userDetails);
        }
    } else if ($method == "POST") {
        //add a user when making profile
        $userController->addUser();
    } else if ($method == "PUT") {
        //update user information
        $userController->updateUser($id);
    } else if ($method == "DELETE") {
        $userController->deleteUser($id);
    }
    
    
}