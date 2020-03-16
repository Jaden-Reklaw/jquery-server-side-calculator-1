//Global Variable
let historyOfExpressions = [];
let stretchHistory = [];

//Allow express in the project to create a server
import express from 'express';

//Add module to calculate user inputs
import calculator from './modules/calculate';
import evaluateExpression from './modules/mathParser';

//Run funciton an returns the web server it created
const app = express();

//Good port to use
const port = 5000;
//Checking if server is listening on a certain port when running
app.listen( port, () => {
	console.log( 'listening on port', port);
});

//Tells the server to allow the public to see these things
// Static file are HTML, CSS, JS, Images, etc
app.use(express.static('server/public'));

//Used to allow JSON for items being received from front end like body parser middleware
app.use(express.json({limit: '1mb'}));

//Creates a RESTFUL API to /input for the user to retrieve data
app.get('/input', (req, res) => {
	console.log('Sending some inputs');
	res.send(historyOfExpressions);
});

//Adds to the RESTFUL API to /input once user inputs data then press = on index.html
app.post('/input',(request,response) => {
	console.log('Recieve expression on server', request.body);
	let obj = calculator(request.body);
	historyOfExpressions.push(obj);
	response.json({
		status: 'success',
	});
});

app.get('/stretch', (req, res) => {
	console.log('Loading new page');
	res.sendStatus(200);
});




