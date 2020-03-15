console.log('client.js');
//Global Variables
let operator;

$(document).ready(onReady);

function onReady() {
	console.log('jquery running!');
	//Connect operator buttons
	$('#add-btn, #subtract-btn, #multiply-btn, #divide-btn').on('click', selectedOperator);
	$('#equal-btn').on('click', sendExpressionToServer);
}

//Function to see which operator was selected.
function selectedOperator(event) {
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
	fetch('/input', options).then((response) => response.json()).then((data) => {
  		console.log('Success:', data);
	}).catch((error) => {
  		console.log('Error:', error);
	});
}

//This works to fetch history of inputs from the server
function receiveExpressionToServer() {
	fetch('/input').then((response) => {
		return response.json();
	}).then((data) => {
		console.log(data);
	}).catch((error) => {
		console.log('Error:', error);
	});
}





