console.log('client.js');
//Global Variables
let operator;
let expression = {};

$(document).ready(onReady);

function onReady() {
	console.log('jquery running!');
	//Connect operator buttons
	$('#add-btn').on('click', adding);
	$('#subtract-btn').on('click', subtracting);
	$('#multiply-btn').on('click', multiplying);
	$('#divide-btn').on('click', dividing);
}

//Function to set operator variable to add
function adding() {
	operator = 'add';
	console.log('operator selected',operator);
}

//Function to set operator variable to subtract
function subtracting() {
	operator = 'subtract';
	console.log('operator selected',operator);
}

//Function to set operator variable to multiply
function multiplying() {
	operator = 'multiply';
	console.log('operator selected',operator);
}

//Function to set operator variable to divide
function dividing() {
	operator = 'divide';
	console.log('operator selected',operator);
}






