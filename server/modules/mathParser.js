let parseEquation = (array) => {
	//Clone mappedArray
	let mappedArray = array.map(item => item);
	
	//Order of Operations Multiply, Divide, Addition, Subtraction
	
	//Check for Multiplication or Division
	for (let i = 0; i < mappedArray.length; i++) {
		if (mappedArray[i] === '*'|| mappedArray[i] === '/') {
			if(mappedArray[i] === '*') {
				let answer =  Number(mappedArray[i - 1]) * Number(mappedArray[i + 1]);
				mappedArray.splice(i-1,3, answer);
			} else if(mappedArray[i] === '/') {
				let answer =  Number(mappedArray[i - 1]) / Number(mappedArray[i + 1]);
				mappedArray.splice(i-1,3, answer);
			}
		i--; //setback index back by 1
		}	
	}

	//Check for Addition or Subtraction
	for (let i = 0; i < mappedArray.length; i++) {
		if (mappedArray[i] === '+'|| mappedArray[i] === '-') {
			if(mappedArray[i] === '+') {
				let answer =  Number(mappedArray[i - 1]) + Number(mappedArray[i + 1]);
				mappedArray.splice(i-1,3, answer);
			} else if(mappedArray[i] === '-') {
				let answer =  Number(mappedArray[i - 1]) - Number(mappedArray[i + 1]);
				mappedArray.splice(i-1,3, answer);
			}
		i--; //setback index back by 1
		}	
	}

	//Create an object to push into array at the end
	let objectAnswer = {answer: mappedArray[0]};
	array.push(objectAnswer);
	console.log('Array with answer',array)
	return array;
}

export default parseEquation;