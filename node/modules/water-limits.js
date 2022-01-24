/* water-limits.js */
function celsiusToFahrenheit(temp){
	return temp * (9/5) + 32;
}

const freezingPointC = 0;
const boilingPointC  = 100;

const freezingPointF = celsiusToFahrenheit(freezingPointC);
const boilingPointF  = celsiusToFahrenheit(boilingPointC);

console.log(`The freezing point of water in F is: ${freezingPointF}`);
console.log(`The boiling point of water in F is: ${boilingPointF}`);