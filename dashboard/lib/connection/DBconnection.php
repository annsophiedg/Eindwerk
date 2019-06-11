<?php

$servername = "ID81394_bartvdb.db.webhosting.be";
$username = "ID81394_bartvdb";
$password = "bart19816093=";

// Create connection
$conn = new mysqli($servername, $username, $password);
$_SERVER['conn']= $conn;

// Check connection
if ($_SERVER['conn']->connect_error) die("Connection to $database failed: " . $_SERVER['conn']->connect_error);

$_SERVER['conn']->select_db ("ID81394_bartvdb");
