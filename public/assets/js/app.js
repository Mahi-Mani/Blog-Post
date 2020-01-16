$(document).ready(function () {
    // To store the ID of user who is currently logged in
    var userId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    var userName;

    $("#signup-btn").on("click", function (event) {
        event.preventDefault();
        // To get value from user
        userName = $("#username").val().trim();
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
        $.get("/api/login/" + username + "/" + password, function (data) {
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
    $("#view-btn").on("click", function (event) {
        event.preventDefault();
        console.log("Inside view button");

        $.ajax("/api/view/blogs", {
            type: "GET"
        }).then(function (result) {
            getBloggerName();
        })
    })

    // Function to get all names of blogger
    function getBloggerName() {

        $.ajax("/api/blogger/name", {
            type: "GET"
        }).then(function (result) {
            console.log(result);
            generateList(result, false);
        })
    }

    // Function to show all blogs to DOM
    function generateList(arr, currentUser) {

        for (var i = 0; i < arr.length; i++) {
            var blogContents = $("<div>");
            blogContents.addClass("jumbotron");
            var blogTitle = $("<h1>");
            blogTitle.addClass("display-4");
            blogTitle.text(arr[i].blogTitle)
            var hrTag = $("<hr>");
            hrTag.addClass("my-4");
            var pTag = $("<p>");
            pTag.text(arr[i].blogText);
            var authorTag = $("<small>");
            var comments = $("<textarea>");
            comments.attr("id", "comments");
            comments.attr("data-id", userId);
            if (!currentUser)
                authorTag.text(arr[i].User.userName);
            else {
                authorTag.text(userName);
            }
            blogContents.append(blogTitle);
            blogContents.append(hrTag);
            blogContents.append(pTag);
            blogContents.append(authorTag);
            blogContents.append(comments);
            $("#allBlogs").append(blogContents);
        }
    }

    // To view blogs I have created
    $("#viewMy-btn").on("click", function (event) {
        event.preventDefault();
        console.log("Inside view my blogs button");

        $.ajax("/api/myblog/" + userId, {
            type: "GET"
        }).then(function (result) {
            console.log(result);
            generateList(result, true);
        })

    })
})