$(document).ready(function () {
    // To store the ID of user who is currently logged in
    var userId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    $("#signup-btn").on("click", function (event) {
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
        }).then(function () {
            console.log("Inserted to table");
        })
    })

    $("#login-btn").on("click", function (event) {
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
            console.log(uniqueUserId);
            window.location = "/" + uniqueUserId;
        })
    }

    $("#submit-btn").on("click", function (event) {
        event.preventDefault();
        console.log("Inside submit button");
        var blogText = $("textarea#blogText").val().trim();
        var blogTitle = $("textarea#blogTitle").val().trim();

        var newBlog = {
            userId: userId,
            blogText: blogText,
            blogTitle: blogTitle
        }

        // Post to blog table
        $.ajax("/api/new/blog", {
            type: "POST",
            data: newBlog
        }).then(function (result) {
            console.log("Inserted into Blog Table");

            // Update user table
            $.ajax("/api/user/update/" + userId, {
                type: "PUT"
            }).then(function () {
                console.log("Updated value to user table")
            })
        })
    })

    // View all blogs event
    $("#view-btn").on("click", function(event){
        event.preventDefault();
        console.log("Inside view button");
    })
})