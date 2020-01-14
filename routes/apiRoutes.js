var express = require("express");
var app = express();

module.exports = function (app) {
    
    app.get("/", function (req, res) {
        res.sendFile(__dirname, "public/index.html");
    })
}