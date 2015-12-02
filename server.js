var express = require("express");
app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function(req,res){
	db.contactlist.find().sort({'name':-1},function(err,docs){
		res.json(docs);
	});	
});
app.post('/contactlist',function(req,res){
	db.contactlist.insert(req.body,function(err,docs){
		res.json(docs);
	});	
});
app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});
app.get('/contactlist/:id',function(req,res){
	var id = req.params.id;
	db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id',function(req,res){
	var id = req.params.id;
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update:{$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true},function(err,doc){
		res.json(doc);
	});
});

app.listen(8080);
console.log("Server running on 8080");
