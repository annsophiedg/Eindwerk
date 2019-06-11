<?php
require_once("../models/HTMLPage.php");
session_start();

// Create index dashboard
$index = new HTMLPage("Login");
$index->AddBootstrap();
$index->AddCSS("../../css/style.css");

// Check if admin is logged in
if( isset($_SESSION['admin']) &&$_SESSION['admin']== true ){ header('Location: ../../index.php'); };

// Else show login page
$index->Add('<div class="logTitle"><h3>Dashboard</h3><h5>Steal My Meal</h5></div>');

$index->Add('<div class="loginContent">');
$index->Add('<div class="loginForm">');

$index->Add('<h1>Admin login</h1>');

$index->Add('<form method="post" action="../authentication/check_login.php">');

$index->Add('<div><span class="fas fa-user"></span><label for="email">email</label></div>');
$index->Add('<input type="email" class="form-control" id="email" name="adm_email">');

$index->Add('<div><span class="fas fa-lock"></span><label for="password"> password</label></div>');
$index->Add('<input type="password" class="form-control" id="password" name="adm_password">');

$index->Add('<button type="submit" class="btn btn-primary" name="authentication" value="Login">Login</button>');

-$index->Add('</form>');

$index->Add('</div>');
$index->Add('</div>');

$index->Generate(); //Generate html
print $index->output;