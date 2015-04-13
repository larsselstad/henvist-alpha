/*jshint node: true*/

var fs = require('fs'),
    htmlMaker = require('./src/htmlMaker');

var dir = fs.readdirSync('.');

console.log(dir);

var today = new Date();

htmlMaker(__dirname, {
    title: 'henvist.no',
    headerRow: ['Spesialister'],
    people: [['<a href="psykologer">Psykologer</a>'], ['<a href="nevropsykologer">Nevropsykologer</a>']],
    lastUpdate: today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear()
});