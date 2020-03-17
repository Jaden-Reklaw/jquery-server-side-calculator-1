let parseEquation = (array) => {
	//Order of Operations Multiply, Divide, Addition, Subtraction
	for (let i = 0; i < array.length; i++) {
		if(array[i] === '*') {
			console.log('index for * is:', i);
		}
	}
}

export default parseEquation;