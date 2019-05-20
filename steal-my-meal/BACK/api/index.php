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
$subject = null;
$id = null;
$input = file_get_contents("php://input");

$request = $_SERVER["REQUEST_URI"];
$method = $_SERVER["REQUEST_METHOD"];

$parts = explode("/", $request);

$subject = null;
$id = null;

if ( count($parts) > 2 ) $api = $parts[2];
if ( count($parts) > 3 ) $subject = $parts[3];
if ( count($parts) > 4 ) $id = $parts[4];

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
        $mealController->addMeal($input);
    }
}

//use Service ChefController if $subject == "chefs"
if ( $subject == "chefs" )
{
    $chefController = new ChefController($dbManager);
    
    if ($method == "GET") {
        if (!$id) {
            //GET overview chefs: sort on location
            $chefs = $chefController->getActiveChefs();
            echo $chefs;
        } else {
            //GET chef details
            $chefDetails = $chefController->getChefDetails($id);
            //if chefDetails = null, user is not a chef!
            echo $chefDetails;
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
            echo $users;
        } else {
            //GET profile (user details)
            $userDetails = $userController->getUserDetails($id);
            echo $userDetails;
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