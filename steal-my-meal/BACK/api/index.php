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

// print 'api: ' .$api.' subject: '.$subject.' id: ' .$id .'<br>';

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
        }
    } else if ($method == "POST") {
        $mealController->addMeal($input);
    } else if($method =="PUT"){
        $mealController->subscribe($input);
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
            // echo $chefs;
        } else {
            //GET chef details
            $chefDetails = $chefController->getActiveChefs($id);
            echo $chefDetails;
            //if chefDetails = null, user is not a chef!
        }
    }    
}

//use Service ChefController if $subject == "chefMeals"
if ( $subject == "chefMeals" )
{
    $chefController = new ChefController($dbManager);

    if ($method == "GET") {
        if ($id) {
            //GET all meals of one chef
            $chefMeals = $chefController->getChefMeals($id);
            echo $chefMeals;
        }
    }
}

//use Service UserController if $subject == "favChefs"
if ( $subject == "favChefs" )
{
    $userController = new UserController($dbManager);
    $chefController = new ChefController($dbManager);

    if ($method == "GET") {
        if ($id) {
            //GET all meals of one chef
            $favChefIds = $userController->getFavoriteChefs($id);
            $favChefDetails = Array();

            foreach (json_decode($favChefIds) as $id) {
                //echo gettype($id) .", ". $id."<br>";
                $chefDetails = json_decode($chefController->getChefDetails($id));
                array_push($favChefDetails,$chefDetails);
            }

            echo json_encode($favChefDetails);
        }
    }
}



//use Service MealController if $subject == "ingredients"
if ( $subject == "ingredients" )
{
    $mealController = new MealController($dbManager);
    
    if ($method == "GET") {
        if (!$id) {
            //GET all ingredients from DB
            $allIngredients = $mealController->getDBIngredients();
            echo $allIngredients;
        }else{
            //GET meal ingredients
            $ingredients = $mealController->getMealIngredients($id);
            echo $ingredients;
        }

    } else if ($method == "POST") {
        $mealController->addIngredient($_POST);
    }
}

//use Service UserController if $subject is "allergies"
if ( $subject == "allergies" )
{
    $userController = new UserController($dbManager);
    
    if ($method == "GET") {
        if (!$id) {
            //GET all allergies
            $allergies = $userController->getAllAllergies();
            echo $allergies;
        } else if ($id) {
            //GET user allergies
            $userAllergies = $userController->getUserAllergies($id);
            echo $userAllergies;
        }
    } else if ($method == "POST") {
        $userController->addUserAllergy($id,$input);
    } else if ($method == "DELETE") {
      $usr_all = explode(",", $id);
      $usr_id = $usr_all[0];
      $all_id = $usr_all[1];

        $userController->deleteUserAllergy($usr_id,$all_id);
    }
        
}

//use Service UserController if $subject is "users"
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
    } else if ($method == "PUT") {
        //update user information
        $userController->updateUser($id,$input);
    } else if ($method == "DELETE") {
        //delete user
        $userController->deleteUser($id);
    }else if ($method == "POST") {
        //add user via dashboard
        $userController->addUser($_POST);
    }
}

//use Service FbController if $subject == "facebook"
if ( $subject == "facebook" )
{
    $fbController = new FbController($dbManager);
    
    if ($method == "POST") {
        // $code = $_SERVER['QUERY_STRING'];
        $url = $_SERVER["HTTP_REFERER"];
        $code = parse_url($url, PHP_URL_QUERY);
        $code = explode('&',$code)[0];
        $code = str_replace("code=","",$code);
        $fb = $fbController->getToken($code);
    }    
}

if ( $subject == "types" )
{
    $typeController = new TypeController($dbManager);
    
    if ($method == "GET") {
        if (!$id) {
            //GET overview types
            $types = $typeController->getTypes();
            echo $types;
        } 
    } else if ($method == "POST") {//post new Type (for dashboard maybe)}
        }

}

if ( $subject == "admin" )
{
    $admincontroller = new AdminController($dbManager);

    if ($method == "GET"){
        if (!$id) {
            //GET overview admin
            $admin = $admincontroller->getAdminOverview();
            echo $admin;
        }
    }else if ( $method == "POST" ) {
        // add admin via dashboard
        $admincontroller->addAdmin($_POST);
    }
}
