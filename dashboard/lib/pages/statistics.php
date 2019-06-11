<?php
require_once("../models/HTMLPage.php");
session_start();

// Create index dashboard
$index = new HTMLPage("Statistics");
$index->AddBootstrap();
$index->AddCSS("../../css/style.css");
$index->AddJavascript("../../ajax/stats.js");

// check if admin is logged in
if( !isset( $_SESSION['admin']) ){ header('Location: login.php'); };


// statistics content
$index->Add('<h6 class="greeting">Welcome, '.$_SESSION["admin"]["adm_firstname"].' '.$_SESSION["admin"]["adm_lastname"].'<h6>');
$index->Add('<div class="statsContent">');

// add sidebar
$index->AddSideBar();
$index->Add('<div class="stats">');

// Admin overview table
$index->Add('<div>');
$index->Add('<h1>Statistics</h1>');
$index->Add('<table id="tbl" class="table table-bordered table-striped table-hover table-dark">');
$index->Add('<thead><tr class="table-header"><th>Admin</th><th>Users</th><th>Meals</th><th>Followed Chefs</th><th>Followers</th></th><th>Available Portions</th><th>Ordered Portions</th><th>Total Portions</th><th>Ingredients</th>');
$index->Add('<tbody id="tbody">');
$index->Add('</tbody>');
$index->Add('</table>');
$index->Add('</div>');

$index->Add('</div>');
$index->Add('</div>'); // END content

$index->Generate(); //Generate html
print $index->output;