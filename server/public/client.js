//Global Variables
let operator;
let expressionArray = [];
let stringNumber = '';

//Initialize the DOM to ready for jquery
$(document).ready(onReady);

//Function that runs once the DOM is ready
function onReady() {
	//Base Mode Buttons
	$('#add-btn, #subtract-btn, #multiply-btn, #divide-btn').on('click', selectedOperator);
	$('#equal-btn').on('click', sendExpressionToServer);
	$('#clear-btn').on('click', clearInputs);

	//Stretch buttons
	$('.num-btn').on('click', insertNumbers);
	$('.operator-btn').on('click', addOperators);
	$('#equal').on('click', sendEquationToServer);
	$('#clear').on('click', clearButton);
	$('#percentage').on('click', percentageButton);
	$('#negative').on('click', turnNegative);
}

//vvvv STRETCH-MODE vvvv

//Function to change the appending-number to -
function turnNegative() {
	console.log('turnNegative');
	stringNumber = '-' + stringNumber;

	//Empty out id appending-number then append to DOM
	$('#appending-number').empty();
	$('#appending-number').append(stringNumber);
}

//Function to change the appending-number into a percentage
function percentageButton() {
	console.log('percentageButton');
	//Change stringNumber
	stringNumber = stringNumber * 0.01;
	//Empty out id appending-number then append to DOM
	$('#appending-number').empty();
	$('#appending-number').append(stringNumber);
}

function clearButton() {
	//Empty out id current and appending-number
	$('#appending-number').empty();
	$('#current').empty();
	stringNumber = '';
}

//Funciton to get the current answer
function renderStretchAnswerToDOM(arrayOfArrays) {
	//Select the last item of an array which is an array
	let array = arrayOfArrays[arrayOfArrays.length -1];

	//Then select that last item which is an object 
	let answer = array[array.length -1].answer;

	//Empty then Render to DOM under ID ans
	$('#ans').empty();
	$('#ans').append(` ${answer}`);
}

function renderStretchHistoryToDOM(arrayOfArrays) {
	//Empty out the current history
	$('#stretch-history').empty();

	//Loop over each array and concatenate into a string expression to append to DOM
	for(let array of arrayOfArrays) {
		let stringExpression = '';
		for (var i = 0; i < array.length; i++) {
			if(typeof(array[i]) === 'object') {
				stringExpression += `= ${array[i].answer}`;
			}else {
				stringExpression += `${array[i]} `;
			}
		}//end inner loop
		$('#stretch-history').append(`<li>${stringExpression}</li>`)
	}// end outer loop
} // end renderStretchHistoryToDOM

//Function to get information from the server
function receiveEquationsFromServer() {
	fetch('/calculations').then((response) => {
		return response.json();
	}).then((data) => {
		console.log('Equations from server',data);
		//Render history and answer to DOM
		renderStretchHistoryToDOM(data);
		renderStretchAnswerToDOM(data);
	}).catch((error) => {
		console.log('Error:', error);
	});
}

//When equal button is clicked it will send the data to the server
function sendEquationToServer() {
	//Send last stringNumber to the array
	expressionArray.push(stringNumber);
	stringNumber = '';

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
		//Empty expression array
		expressionArray = [];
		receiveEquationsFromServer();
	}).catch(error => {
  		console.log('Error:', error);
	});
}

//Funciton that will add an operator and push the value of stringNumber into an
//array called expressionArray
function addOperators(event) {
	let operand = event.target.value;

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

	//Empty out id appending-number then append to DOM
	$('#appending-number').empty();
	$('#appending-number').append(stringNumber);
}

//vvvv BASE-MODE vvvv

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





