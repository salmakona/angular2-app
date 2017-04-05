"use strict";
var express = require("express");
var path = require("path");
var app = express();
app.use('/', express.static(path.join(__dirname)));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
var server = app.listen(port);
