var request = require('request');
var http = require('http');
var express = require('express');
//var Step = require('step');
var exec = require('child_process').exec;

var app = express();

var key = "ta1ZP011y2AlouAxcN0aS6zjQ5pcSp3T";
var secret =  "Zaa1mldvJEasq5wc";
var access_token = "";

var bucket = {
   "key": "medical_bucket",
   "owner": "ta1ZP011y2AlouAxcN0aS6zjQ5pcSp3T",
   "createDate": 1437273936883,
   "permissions": [
      {
         "serviceId": "ta1ZP011y2AlouAxcN0aS6zjQ5pcSp3T",
         "access": "full"
      }
   ],
   "policyKey": "transient"
}

var token_req = request.post(
	{
		url: "https://developer.api.autodesk.com/authentication/v1/authenticate",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: "client_id=" + key + "&client_secret=" + secret + "&grant_type=client_credentials"
	},
	function(err, res, body) {
		access_token = JSON.parse(body)["access_token"];
		console.log(access_token);
});


app.get("/", function(req, res) {
	res.send('use localhost:3000/scale?x=X&y=Y&z=Z');
});

app.get("/scale", function(req, res) {
	var x = req.query.x;
	var y = req.query.y;
	// exec("python scale_stl.py "+x+" "+y+" "+z, function(e, out, err) {

	// });
	//generates new stl file
	//exec("echo adfadf", function(e, out, err) {
		//get new api token
		
		//request.put("adsfads", function(error, resp, body) {
			//res.send(body);
		//});
	//});

    //res.send({"url": access_token});
	res.send('<iframe src="http://a360.co/1KdXWuH" style="width:900px; height:750px;"></iframe>');
});

var server = app.listen(3000, function() {
	console.log("server started");
});