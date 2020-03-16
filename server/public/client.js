//Global Variables
let operator;
let stringNumbers = '';

//Gloabal Variable for a flag for inserting a decimal
let flagDecimal = 0;

//Initialize the DOM to ready for jquery
$(document).ready(onReady);

//Function that runs once the DOM is ready
function onReady() {
	//Connect operator buttons
	$('#add-btn, #subtract-btn, #multiply-btn, #divide-btn').on('click', selectedOperator);
	$('#equal-btn').on('click', sendExpressionToServer);
	$('#clear-btn').on('click', clearInputs);
	$(`#b0, #b1, #b2, #b3, #b4, #b5, #b6, #b7, #b8, #b9, #decimal, #divide, #multiply, #subtract, #add`).on('click', insertButton);
	$('#equal').on('click', sendEquationToServer);
}

//Stretch Mode

//function to grab user clicks on numbers, decimals and operators
function insertButton(event) {
	stringNumbers += event.target.value;
	$('#expressionString').append(event.target.value);	
}

//Send information to the server
function sendEquationToServer(event) {
	console.log('sendEquationToServer');
	//Options for using POST method to send to the server
	const options = {
		method: 'POST',
		headers: {
    		'Content-Type': 'application/json'
  		},
		body: JSON.stringify({stringNumbers})
	}

	//Using fetch api to send information to the server
	fetch('/equation', options).then(response => {
		console.log('sending stretch expression to server',response);
	}).catch(error => {
  		console.log('Error:', error);
	});
}

function receiveEquationFromServer() {
	fetch('/equation').then((response) => {
		return response.json();
	}).then((data) => {
		console.log('data',data);
	}).catch((error) => {
		console.log('Error:', error);
	});
} 


//Based Mode
//Function to see which operator was selected.
function selectedOperator(event) {
	console.log(event.target.id);
	operator = event.target.id;
}

function sendExpressionToServer() {
	//Capture user inputs then create an object to past to the server
	let number1 = $(`#first-number`).val();
	let number2 = $(`#second-number`).val();
	let expression = {number1, number2, operator};
	
	//Options for using POST method to send to the server
	const options = {
		method: 'POST',
		headers: {
    		'Content-Type': 'application/json'
  		},
		body: JSON.stringify(expression)
	};

	//Using fetch api to send information to the server
	fetch('/input', options).then(response => {
		console.log('sending expression to server',response);
	}).catch(error => {
  		console.log('Error:', error);
	});

	//After inputs are post get them from the server
	receiveExpressionToServer();
}

//This works to fetch history of inputs from the server
function receiveExpressionToServer() {
	fetch('/input').then((response) => {
		return response.json();
	}).then((data) => {
		console.log('data',data);
		//Render to DOM
		renderAnswerToDOM(data);
		renderHistoryToDOM(data);
	}).catch((error) => {
		console.log('Error:', error);
	});
}

//Render Answer to the DOM
function renderAnswerToDOM(arrayOfObject) {
	$(`#answer`).empty();
	$(`#answer`).append(arrayOfObject[arrayOfObject.length -1].answer);
}

//Render history of past answers to the DOM
function renderHistoryToDOM(arrayOfObject) {
	$(`#history-output`).empty();
	for(let expression of arrayOfObject) {
		$(`#history-output`).append(`<li>${expression.number1} ${expression.operator} ${expression.number2} = ${expression.answer}</li>`);
	}
}

//Function for event listener to clear input values once clear button is pushed
function clearInputs() {
	$(`#first-number`).val('');
	$(`#second-number`).val('');
}





