//Global Variables
let operator;

//Initialize the DOM to ready for jquery
$(document).ready(onReady);

//Function that runs once the DOM is ready
function onReady() {
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
	fetch('/input', options).then(response => {
		console.log(response);
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





