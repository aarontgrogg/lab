/* celsius-to-fahrenheit.js */
function celsiusToFahrenheit(temp){
	return temp * (9/5) + 32;
}

const input  = process.argv[2];
const output = celsiusToFahrenheit(input);

//console.log(process);
console.log(`${input} degrees C = ${output} degrees F`);