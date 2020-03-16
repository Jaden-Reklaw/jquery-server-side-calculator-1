//Global Variables
let operator;
let expressionArray = [];
let stringNumber = '';

//Initialize the DOM to ready for jquery
$(document).ready(onReady);

//Function that runs once the DOM is ready
function onReady() {
	//Connect operator buttons
	$('#add-btn, #subtract-btn, #multiply-btn, #divide-btn').on('click', selectedOperator);
	$('#equal-btn').on('click', sendExpressionToServer);
	$('#clear-btn').on('click', clearInputs);

	//Stretch buttons
	$('.num-btn').on('click', insertNumbers);
	$('.operator-btn').on('click', addOperators);
	$('#equal').on('click', sendEquationToServer);
}

function sendEquationToServer() {
	//Send last stringNumber to the array
	expressionArray.push(stringNumber);

	//Empty out id current and appending-number
	$('#appending-number').empty();
	$('#current').empty();

	//Send expressionArray to server with POST method
	const options = {
		method: 'POST',
		headers: {
    		'Content-Type': 'application/json'
  		},
		body: JSON.stringify(expressionArray)
	};

	//Using fetch api to send information to the server
	fetch('/calculations', options).then(response => {
		console.log('sending stretch expression to server',response);
	}).catch(error => {
  		console.log('Error:', error);
	});
}

//Funciton that will add an operator and push the value of stringNumber into an
//array called expressionArray
function addOperators(event) {
	let operand = event.target.value;
	console.log('operand', operand);

	//Push numbers and operands to the array
	expressionArray.push(stringNumber);
	expressionArray.push(operand);

	//Set stringNumber back to nothing
	stringNumber = '';

	//Empty DOM for id appending-number and current
	$('#appending-number').empty();
	$('#current').empty();

	//Append DOM for id current using for loop
	for(let item of expressionArray) {
		$('#current').append(`${item} `);
	}
}

//Event handler that when you click on the number buttons and decimal it 
//adds the information to the DOM and stringOfNumbers array
function insertNumbers(event) {
	//Concatenate the numbers
	stringNumber += event.target.value;
	console.log('string number is:',stringNumber);

	//Empty out id appending-number then append to DOM
	$('#appending-number').empty();
	$('#appending-number').append(stringNumber);
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





