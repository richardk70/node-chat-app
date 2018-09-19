// const moment = require('moment');
const dayjs = require('dayjs');

// remember, time stored in milliseconds.
// 1000 is 1 second then.
// var now = new Date().getHours();
// var now = new Date().getDay();

var createdAt = dayjs();

var date = dayjs();
console.log(createdAt.format());

console.log('today: ', date.format('dddd, MMMM D, YYYY'));

// one day ago
var yesterday = date.subtract(1, 'days');
console.log('yesterday: ', yesterday.format('dddd, MMMM D'));

var date = dayjs();
var twoMonths = date.add(2, 'months');
console.log('two months from now: ', twoMonths.format('dddd, MMMM D'));

