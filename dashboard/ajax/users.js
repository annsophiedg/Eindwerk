$( function() {

    //-----GET USERS
    $.ajax({
        url: "http://localhost:3000/BACK/api/users",
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data)
            BuildUsersTable(data);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            $('#errorResponse').html("Something went wrong: " + textStatus);
        }
    });

    //----- FUNCTIONS
    // Build Admin Table
    function BuildUsersTable(data) {
        var newrows;
        for (var user in data) {
            newrows += '<tr><td>'+ data[user].usr_id +' </td>';
            newrows += '<td>'+ data[user].usr_firstname +' </td>';
            newrows += '<td>'+ data[user].usr_lastname +'</td>';
            newrows += '<td>'+ data[user].usr_email +'</td>';
            newrows += '<td>'+ data[user].usr_telephone +'</td>';
            newrows += '<td>'+ data[user].usr_street +'</td>';
            newrows += '<td>'+ data[user].usr_housenumber +'</td>';
            newrows += '<td>'+ data[user].zip_city +'</td>';
            newrows += '<td>'+ data[user].zip_zipcode +'</td>';
            newrows += '</tr>';
        }
        $('#tbody').html(newrows);
    };

});