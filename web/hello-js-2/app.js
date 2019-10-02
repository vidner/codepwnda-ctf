var express = require('express');
var app = express();

app.get('/', function (req, res) {
	let query;
	if(!req.query.q){
		res.redirect(req.url+'?q=undefined');
	}else{
		query = req.query.q.split(";")[0];
	}
  res.send('<html><head><title>Hello JS</title></head><body>Hello '+ eval('\"'+query+'!\"') +' Welcome to level 2</body></html>' );
  
});

app.listen(50050, function () {
  console.log('Example app listening on port 50050!');
});