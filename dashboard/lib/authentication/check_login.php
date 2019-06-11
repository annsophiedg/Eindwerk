<?php
require_once ('../connection/DBconnection.php');
session_start();

if ( $_POST["authentication"] == "Login" )
{
    unset($_POST['authentication']);      // Remove authentication post value
    $hashed = hash("md5", $_POST["adm_password"]);

    // select logged in Admin
    $sql = "SELECT * FROM admin where adm_email=" . "'" . $_POST["adm_email"] . "'" . " and adm_password=" . "'" . $hashed . "'";
    $result = $_SERVER['conn']->query($sql);

    //check if authentication in correct
    if ( $result->num_rows == 1 )
    {
        $row = $result->fetch_assoc();
        $_SESSION['admin'] = $row;
        header('Location: ../../index.php');
    }
    else {
        header('Location: ../pages/login.php');
    }
}
