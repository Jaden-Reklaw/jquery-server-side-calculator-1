//Allow express in the project to create a server
const express = require('express');
//Bring bodyParse in order to deal with post
const bodyParser =require('body-parser');

//Run funciton an returns the web server it created
const app = express();

//Good port to use
const port = 5000;

//Tells the server to allow the public to see these things
// Static file are HTML, CSS, JS, Images, etc
app.use(express.static('server/public'));

//Configure body parser so that our req.body is not undefined
app.use(bodyParser.urlencoded({extended:true}));

app.listen( port, () => {
	console.log( 'listening on port', port);
})



