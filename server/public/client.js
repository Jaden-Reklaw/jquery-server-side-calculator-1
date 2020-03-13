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
	console.log('in sendExpressionToServer');
	let number1 = $(`#first-number`).val();
	let number2 = $(`#second-number`).val();
	console.log(`Number 1: ${number1} Number 2: ${number2}`);
	let expression = {number1, number2, operator};
	console.log('expression is', expression)
}






