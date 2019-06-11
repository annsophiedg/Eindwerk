$( function() {

    //-----GET USERS
    $.ajax({
        url: "http://localhost:3000/BACK/api/statistics",
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data[0] );
            var newrows;
                newrows += '<tr><td>'+ data[0].NumberOfAdmin +' </td>';
                newrows += '<td>'+ data[0].NumberOfUsers +' </td>';
                newrows += '<td>'+ data[0].NumberOfMeals +' </td>';
                newrows += '<td>'+ data[0].NumberOfFollowedChefs +' </td>';
                newrows += '<td>'+ data[0].NumberOfFollowers +' </td>';
                newrows += '<td>'+ data[0].AvailablePortions +'</td>';
                newrows += '<td>'+ data[0].OrderedPortions +'</td>';
                newrows += '<td>'+ data[0].TotalPortions +' </td>';
                newrows += '<td>'+ data[0].NumberOfIngredients +' </td>';
                newrows += '</tr>';
            $('#tbody').html(newrows);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            $('#errorResponse').html("Something went wrong: " + textStatus);
        }
    });

});