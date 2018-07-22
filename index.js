const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql'); // /usr/local/mysql/bin/mysql -u root -p (password: password). USE mydb
let path = require('path');


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb"
});

app.set('view engine','ejs');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static(__dirname + '/views'));

app.get('/',function(req, res, next){
       
     res.sendFile('/index.html');
     //next()

});

con.connect(function(err) {
  	if (err) throw err;
  	console.log("Connected!");
  	
  	
  });

let checkWorksheets = function (req, res) {
  	let inp = req.body.topic;
	app.locals.topic = inp;
	let sql = "SELECT name FROM worksheets WHERE "+inp+"= 'Yes'";
  	con.query(sql, function (err, result) {
  		if (err) throw err;
  		let worksheetList = []
  		console.log(result.length);
  		for (let i = 0; i < result.length; i++) {
  			worksheetList.push(result[i].name);
  		}
  		console.log('done with func 1')
  		console.log(worksheetList);
  		//app.locals.lin = worksheetList;
  		res.render('search-results.ejs', {lin: worksheetList});
  	})
}


app.use(checkWorksheets);
app.post('/views/search-results', function(req, res) {
  		console.log('hi');
  		checkWorksheets(req, res);
  		//console.log('hello');
  		
  	})
 



  
  /*
  let worksheetList = [];
  let sql = ;
  con.query(sql, function (err, result) {
  		if (err) throw err;
  		
  		for (let i = 0; i < result.length; i++) {
  			worksheetList += result[i].name;
  		}

  		console.log(worksheetList);
  	});

  console.log('hi');
  console.log(worksheetList);
  app.locals.lin = worksheetList;
  res.render('search-results.ejs');
});*/







app.listen(8000, () => {
  console.log('App listening on port 8000!')
});