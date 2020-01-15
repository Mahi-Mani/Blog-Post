var db = require("../models");
var path = require("path");

module.exports = function (app) {

    app.get("/", function (req, res) {
        console.log("Inside root riute");
        res.sendFile(path.join(__dirname + "/../public/home.html"));
    })

    app.post("/api/newuser", function (req, res) {
        console.log("Inside new user");

        db.User.create({
            userName: req.body.userName,
            password: req.body.password,
            hasBlog: req.body.hasBlog
        }).then(function (result) {
            console.log("Inserted into table");
        }).catch(function (err) {
            console.log(err);
        })
    })

    app.get("/api/:username/:password", function (req, res) {

        db.User.findOne({
            where: {
                username: req.params.username,
                password: req.params.password
            }
        }).then(function (dbUser) {
            console.log(dbUser);
            res.json(dbUser);
        })
    })

    app.get("/:id", function (req, res) {
        console.log("Inside unique id");
        res.sendFile(path.join(__dirname, "/../public/blog.html"));
    })
}