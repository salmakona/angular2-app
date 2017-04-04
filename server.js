"use strict";
var express = require("express");
var path = require("path");
var app = express();
app.use('/', express.static(path.join(__dirname)));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
var server = app.listen(8080, "localhost", function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    console.log('Listening on %s %s', address, port);
});
