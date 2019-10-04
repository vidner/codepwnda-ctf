var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', function (req, res) {
	let query;

	if(!req.query.q){
		res.redirect('/?q=undefined');
	}else{
		query = req.query.q.split(";")[0];
	}
	if(query.includes('require')){
		res.send('Maap payload anda masuk black list.');
	}else if(query.length > 30 ){
		res.send("payload kepanjangan gan.");
	}else{
	  let payload = '<html><head><title>Hello JS</title></head><body>Hello '+ eval('\"'+query+'!\"') +' Welcome to level 3</body></html>' ;
	  let leak = 'Ini isi package.json gw btw:<br>';
	  leak += fs.readFileSync('./package.json','utf-8');
	  res.send(payload+'<br>'+leak);
	 }
});

app.listen(50050, function () {
  console.log('Example app listening on port 50050!');
});