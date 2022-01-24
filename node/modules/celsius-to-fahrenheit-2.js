/* celsius-to-fahrenheit-2.js */
const { celsiusToFahrenheit } = require('./converters.js');

const input  = process.argv[2];
const output = celsiusToFahrenheit(input);

console.log(`${input} degrees C = ${output} degrees F`);