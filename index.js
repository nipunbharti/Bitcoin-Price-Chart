var moment = require('moment');
var request = require("request");
var express = require("express");
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test1");

var testSchema = new mongoose.Schema({
	time_stamp: Date,
	price: Number
});

var test = mongoose.model("test", testSchema);

var price, count=0;

setInterval(function(){
	var secondsNow = moment().format('h:mm:ss a');
	var now = new Date();
	request("https://blockchain.info/ticker",function(error, response, body){
		if(!error && response.statusCode == 200){
			var parsedData = JSON.parse(body);
			price = parsedData.USD.buy;
		}
	})

	console.log("Time: " + now);
	console.log("Price: " + price + " $");

	test.create({
		time_stamp: now,
		price: price
	}, function(err, testCase){
		if(err){
			console.log(err);
		}
		else{
			console.log("Data entered");
		}
	});

	// test.find({}, function(err, testCase){
	// 	if(err){
	// 		console.log(err);
	// 	}
	// 	else{
	// 		console.log(testCase);
	// 	}
	// });

}, 1000);