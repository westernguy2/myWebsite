const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
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

app.get('/',function(req,res){
       
     res.sendFile('/index.html');

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
  	if (err) throw err;
  	console.log("Database created");
  });
});


app.post('/views/search-results', function(req, res) {
  app.locals.topic = req.body.topic;
  res.render('search-results.ejs');
});




app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});