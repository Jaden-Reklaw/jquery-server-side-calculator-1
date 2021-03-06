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
const PORT = process.env.PORT || 5000;

//Checking if server is listening on a certain port when running
app.listen( PORT, () => {
	console.log( 'listening on port', PORT);
});

//Tells the server to allow the public to see these things
// Static file are HTML, CSS, JS, Images, etc
app.use(express.static('server/public'));

//Used to allow JSON for items being received from front end like body parser middleware
app.use(express.json({limit: '1mb'}));

//Creates a RESTFUL API to /input for the user to retrieve data
app.get('/input', (request, response) => {
	console.log('Sending some inputs');
	response.send(historyOfExpressions);
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

//Stretch Calculator
app.post('/calculations',(request,response) => {
	console.log('Recieve stretch expression on server', request.body);
	stretchHistory.push(request.body);
	let obj = evaluateExpression(request.body);
	
	response.json({
		status: 'success',
	});
});

app.get('/calculations', (request, response) => {
	console.log('Sending some stretchHistory array');
	response.send(stretchHistory);
});




