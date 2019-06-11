<?php

$configuration = array(
    'db_dsn'  => 'mysql:host=ID81394_bartvdb.db.webhosting.be;dbname=ID81394_bartvdb',
    'db_user' => 'ID81394_bartvdb',
    'db_pass' => 'bart19816093='
);

//first require abstract class!! and then the extended classes
require __DIR__ . '/../lib/Service/Container.php';
require __DIR__ . '/../lib/Service/DBManager.php';
require __DIR__ . '/../lib/Service/MealController.php';
require __DIR__ . '/../lib/Service/ChefController.php';
require __DIR__ . '/../lib/Service/UserController.php';
require __DIR__ . '/../lib/Service/OrderController.php';
require __DIR__ . '/../lib/Service/FbController.php';
require __DIR__ . '/../lib/Service/TypeController.php';
require __DIR__ . '/../lib/Service/DashboardController.php';

?>