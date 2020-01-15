$(document).ready(function(){
    $("#signup-btn").on("click", function(event){
        event.preventDefault();
        // To get value from user
        var userName = $("#username").val().trim();
        var password = $("#password").val().trim();

        // New obj creation
        var newUser = {
            userName: userName,
            password: password,
            hasBlog: false
        }

        // Post values to User table
        $.ajax("/api/newuser", {
            type: "POST",
            data: newUser
        }).then(function(){
            console.log("Inserted to table");
        })
    })

    $("#login-btn").on("click", function(event){
        event.preventDefault();
        console.log("Inside login button");

        var username = $("#loginUserName").val().trim();
        var password = $("#loginpassword").val().trim();

        getUser(username, password);
    })

    function getUser(username, password) {
        $.get("/api/" + username + "/" + password, function (data) {
            console.log(data);
            uniqueUserId = data.id;
            window.location = "/" + uniqueUserId;
        })
    }
})