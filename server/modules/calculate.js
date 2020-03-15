let calculateExpression = (expression) => {
	let num1 = Number(expression.number1);
	let num2 = Number(expression.number2);
	switch(expression.operator) {
		case 'add-btn':
			expression.answer = num1 + num2;
			expression.operator = '+';
			break;
		case 'subtract-btn':
			expression.answer = num1 - num2;
			expression.operator = '-';
			break;
		case 'multiply-btn':
			expression.answer = num1 * num2;
			expression.operator = '*';
			break;
		case 'divide-btn':
			expression.answer = num1 / num2;
			expression.operator = '/';
			break;
		default:
		console.log('Something went wrong!');
	}
	return expression;
}

export default calculateExpression;