/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

//'use strict';
//module.exports = require('express');
var express = require('express');
var app = express();
var d3   = require('d3');
    
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'keyspace1'});
var query = 'SELECT nblikes,datemessage,idpage,theme FROM post  ';
var queryHilaryPosts = 'SELECT name FROM post WHERE idpage=?  ';
var queryDonaldPosts = 'SELECT name FROM post where pageid =  ';
var query1 = 'SELECT datemessage,nblikes FROM post ';

var path    = require("path");


app.get('/facebook',function(req,res){
  res.sendFile(path.join(__dirname+'/facebook.html'));
  //__dirname : It will resolve to your project folder.
});

/*
app.get('/post', function (req, res) {
	
	res.sendFile('E:\projetexpress\facebook.html');
  
});
*/

app.get('/post', function (req, res) {
	
	client.execute(query, [], function(err, result) {
	//assert.ifError(err);
	res.send(result.rows);
	});
  
});
app.get('/clinton', function (req, res) {
	
	client.execute(queryHilaryPosts, ['889307941125736'], function(err, result) {
	//assert.ifError(err);
	res.send(result.rows);
	});
  
});

app.get('/trump', function (req, res) {
	
	client.execute(query, [], function(err, result) {
	//assert.ifError(err);
	res.send(result.rows);
	});
  
});

app.listen(3000, function () {
	
  console.log('Example app listening on port 3000!');
});





