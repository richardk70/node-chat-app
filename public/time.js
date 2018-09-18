const moment = require('moment');

// remember, time stored in milliseconds.
// 1000 is 1 second then.
// var now = new Date().getHours();
// var now = new Date().getDay();

var date = moment();

console.log('today: ', date.format('MMMM Do, YYYY'));

// one day ago
var yesterday = date.subtract(1, 'days');
console.log('yesterday: ', yesterday.format('MMMM Do'));

var date = moment();
var twoMonths = date.add(2, 'months');
console.log('two months from now: ', twoMonths.format('MMMM Do'));

