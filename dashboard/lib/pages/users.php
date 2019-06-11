<?php
require_once("../models/HTMLPage.php");
session_start();

// create index dashboard
$index = new HTMLPage("Users");
$index->AddBootstrap();
$index->AddCSS("../../css/style.css");
$index->AddJavascript("../../ajax/users.js");

// check if admin is logged in
if( !isset( $_SESSION['admin']) ){ header('Location: login.php'); };

$index->Add('<h6 class="greeting">Welcome, '.$_SESSION["admin"]["adm_firstname"].' '.$_SESSION["admin"]["adm_lastname"].'<h6>');

$index->Add('<div class="usersContent">');

$index->AddSideBar();
$index->Add('<div class="users">');

// Admin overview table
$index->Add('<div>');
$index->Add('<h1>Users</h1>');
$index->Add('<table id="tbl" class="table table-bordered table-striped table-hover table-dark">');
$index->Add('<thead><tr class="table-header"><th>Id</th><th>First name</th><th>Last name</th><th>Email</th><th>Telephone</th><th>Street</th><th>Nr.</th><th>City</th><th>Zipcode</th>');
$index->Add('<tbody id="tbody">');
$index->Add('</tbody>');
$index->Add('</table>');
$index->Add('</div>');

$index->Add('</div>');
$index->Add('</div>'); // END content

$index->Generate(); //Generate html
print $index->output;