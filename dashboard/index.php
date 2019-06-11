<?php
require_once("lib/models/HTMLPage.php");
session_start();

// check if admin is logged in
if( !isset( $_SESSION['admin']) ){ header('Location: lib/pages/login.php'); };

// create index dashboard
$index = new HTMLPage("Admin");
$index->AddBootstrap();
$index->AddCSS("css/style.css");
$index->AddJavascript("ajax/admin.js");

// index content
$index->Add('<h6 class="greeting">Welcome, '.$_SESSION["admin"]["adm_firstname"].' '.$_SESSION["admin"]["adm_lastname"].'<h6>');
$index->Add('<div class="usersContent">');

// add sidebar
$index->AddSideBar();

$index->Add('<div class="users">');
$index->Add('<div>');
$index->Add('<h1>Admin</h1>');
$index->Add('<table id="tbl" class="table table-bordered table-striped table-hover table-dark">');
$index->Add('<thead><tr class="table-header"><th>Id</th><th>First name</th><th>Last name</th><th>Email</th>');
$index->Add('<tbody id="tbody">');
$index->Add('</tbody>');
$index->Add('</table>');

// add new Admin
$index->Add('<button id="add" class="btn btn-success" data-toggle="modal" data-target="#addAdminModal">Add new admin</button>');

$index->Add('</div>'); //END content

// models for form

// add new admin
$index->AddModal('Add new admin', 'addAdminModal','btnSaveAdm', '

    <form id=addAdminForm name=addAdminForm>
        <div class="form-group row">
            <div class="col-sm-6">
                <label for="firstname">First name</label>
                <input type="text" class="form-control" id="firstname" name="adm_firstname" required>
            </div>
            <div class="col-sm-6">
                <label for="lastname">Last name</label>
                <input type="text" class="form-control" id="lastname" name="adm_lastname" required>
            </div>                      
        </div>
        <div class="form-group row">
            <div class="col-sm-6">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email" name="adm_email" required>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-6">
                <label for="password">New Password</label>
                <input type="password" class="form-control" id="password" name="adm_password" required>
            </div>
            <div class="col-sm-6">
                <label for="password_check">Check Password</label>
                <input type="password" class="form-control" id="password_check" name="adm_password_check" required>
            </div>
        </div>
    </form>
    ');

// edit admin
$index->AddModal('Edit admin', 'editAdminModal','btnEditAdm', '

     <form id=editAdminForm name=editAdminForm>
        <div class="form-group row">
            <div class="col-sm-6">
                <label for="editfirstname">First name</label>
                <input type="text" class="form-control" id="editfirstname" name="adm_firstname" required>
            </div>
            <div class="col-sm-6">
                <label for="editlastname">Last name</label>
                <input type="text" class="form-control" id="editlastname" name="adm_lastname" required>
            </div>                      
        </div>
        <div class="form-group row">
            <div class="col-sm-6">
                <label for="editemail">Email</label>
                <input type="text" class="form-control" id="editemail" name="adm_email" required>
            </div>
        </div>
     </form>
    ');

$index->Add('<div id="errorResponse"></div>'); // Responses
$index->Add('</div>'); //end admin content
$index->Add('</div>'); //end container

$index->Generate(); //Generate html
print $index->output;