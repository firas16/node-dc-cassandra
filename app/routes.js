module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes	
	// sample api route
	var path    = require("path");
	var cassandra = require('cassandra-driver');
	var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'keyspace1'});
	var query = 'SELECT nblikes,datemessage,idpage,theme FROM post  ';
	var queryHilaryPosts = 'SELECT name FROM post WHERE idpage=?  ';
	var queryDonaldPosts = 'SELECT name FROM post where pageid =  ';
	var query1 = 'SELECT datemessage,nblikes FROM post ';
	app.get('/facebook',function(req,res){
		res.sendFile(path.join(__dirname+'/../public/html/indexindex.html'));
		//__dirname : It will resolve to your project folder.
	});
	
	app.get('/post', function (req, res) {
	
		client.execute(query, [], function(err, result) {
		//assert.ifError(err);
		res.send(result.rows);
	});
  
});

}