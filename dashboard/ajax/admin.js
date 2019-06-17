$( function() {

    //-----GET ADMIN
    $.ajax({
        url: "https://wdev.be/bartvdb/BACK/api/admin",
        type: "GET",
        dataType: "json",
        success: function ( data) {
            BuildAdminTable(data);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            $('#errorResponse').html("Something went wrong: " + textStatus);
        }
    });


    //-----INSERT New Admin
    $('body').on('click', '.btnSaveAdm', function(e) {
        e.preventDefault();

        var password = $('#password').val();
        var passwordCheck = $('#password_check').val();

        if(password == passwordCheck){

            var form = {};
            var a = $('#addAdminForm').serializeArray();

            // convert serialized form to json
            $.each(a, function () {
                if (form[this.name]) {
                    if (!form[this.name].push) {
                        form[this.name] = [form[this.name]];
                    }
                    form[this.name].push(this.value || '');
                } else {
                    form[this.name] = this.value || '';
                }
            });

            $.ajax({
                url: "https://wdev.be/bartvdb/BACK/api/admin",
                type: "POST",
                data: form,
                success: function( data ) {
                    console.log(data);
                    data = JSON.parse(data);
                    BuildAdminTable( data );
                    $('#addAdminModal').modal('hide');
                },
                error: function( jqXhr, textStatus, errorThrown) {
                    $('#errorResponse').html("Something went wrong: " + textStatus);
                }
            });
        }else{
            alert('passwords dont match!');
        }
    }); // END Save New Admin


    //-----DELETE Admin
    $('body').on('click', '.btn-delete', function(e) {
        e.preventDefault();

        var id = $(this).attr("data-id");

        $.ajax({
            url: "https://wdev.be/bartvdb/BACK/api/admin" + id,
            type: "DELETE",
            dataType: "json",
            success: function( data  ) {
                BuildAdminTable( data );
            },
            error: function( jqXhr, textStatus, errorThrown) {
                $('#errorResponse').html("Something went wrong: " + textStatus);
            }
        });

    }); // END Delete Admin


    //-----EDIT Admin
    // Set default values in input
    var currentId = {}; // Global variable to pass admin id

    // Get input new input values for editing Admin
    $('body').on('click', '.btn-edit', function () {

        // Pass current id
        var id = $(this).attr("data-id");
        currentId.id = id;

        // Get value from each specific row in table
        var firstname = $('td[data-id="'+id+'"][class=adm_firstname]').html();
        var lastname = $('td[data-id="'+id+'"][class=adm_lastname]').html();
        var email = $('td[data-id="'+id+'"][class=adm_email]').html();

        // Give inputs table value
        $("#editfirstname").val(firstname);
        $("#editlastname").val(lastname);
        $("#editemail").val(email);

    });

    // EDIT admin
    $('body').on('click', '.btnEditAdm', function(e) {
        e.preventDefault();

        var form = {};
        var a = $('#editAdminForm').serializeArray();

        // convert serialized form to json
        $.each(a, function () {
            if (form[this.name]) {
                if (!form[this.name].push) {
                    form[this.name] = [form[this.name]];
                }
                form[this.name].push(this.value || '');
            } else {
                form[this.name] = this.value || '';
            }
        });

        $.ajax({
            url: "https://wdev.be/bartvdb/BACK/api/admin"+currentId.id,
            type: "PUT",
            dataType: "json",
            data: JSON.stringify(form),
            success: function( data ) {
                BuildAdminTable(data);
                $('#editAdminModal').modal('hide');
            },
            error: function( jqXhr, textStatus, errorThrown) {
                $('#errorResponse').html("Something went wrong: " + textStatus);
            }
        });
    }); // END Edit Admin


    //----- FUNCTIONS
    // Build Admin Table
    function BuildAdminTable(data) {
        var newrows;
        for (var admin in data) {
            newrows += '<tr><td data-id="'+data[admin].adm_id+'" class="adm_id">' + data[admin].adm_id +' </td>';
            newrows += '<td data-id="'+data[admin].adm_id+'" class="adm_firstname">' + data[admin].adm_firstname +' </td>';
            newrows += '<td data-id="'+data[admin].adm_id+'" class="adm_lastname">' + data[admin].adm_lastname +'</td>';
            newrows += '<td data-id="'+data[admin].adm_id+'" class="adm_email">'+ data[admin].adm_email +'</td>';
            newrows += '<td><button class="btn btn-warning btn-action btn-edit " data-id="'+data[admin].adm_id+'" data-toggle="modal" data-target="#editAdminModal">Edit</button>'
            newrows += '<button class="btn btn-danger btn-action btn-delete" data-id="'+ data[admin].adm_id +'">Delete</button></td>';
            newrows += '</tr>';
        }
        $('#tbody').html(newrows);
    };
});