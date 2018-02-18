const express = require('express');
const bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Set port
app.set('port', (process.env.PORT || 5000));

// Specify directory for static content
app.use(express.static(__dirname + '/public'));

// Index page
app.get('/', function(req, res) {
  res.render('index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
