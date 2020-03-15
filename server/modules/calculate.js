let calculateExpression = (expression) => {
	let answer;
	let num1 = Number(expression.number1);
	let num2 = Number(expression.number2);
	switch(expression.operator) {
		case 'add-btn':
			answer = num1 + num2;
			break;
		case 'subtract-btn':
			answer = num1 - num2;
			break;
		case 'multiply-btn':
			answer = num1 * num2;
			break;
		case 'divide-btn':
			answer = num1 / num2;
			break;
		default:
		console.log('Something went wrong!');
	}
	return answer;
}

export default calculateExpression;