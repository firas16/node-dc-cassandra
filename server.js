// modules =================================================
var express = require('express');
var app = express();
var d3   = require('d3');
var path    = require("path");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cassandra = require('cassandra-driver');

//queries for database
var query = 'SELECT nblikes,datemessage,idpage,theme FROM post  ';
var queryHilaryPosts = 'SELECT name FROM post WHERE idpage=?  ';
var queryDonaldPosts = 'SELECT name FROM post where pageid =  ';
var query1 = 'SELECT datemessage,nblikes FROM post ';

// config files
var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'keyspace1'});

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
exports = module.exports = app; // expose app