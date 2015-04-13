/*jshint node: true*/

var fs = require('fs'),
    htmlMaker = require('../src/htmlMaker');

var dirs = fs.readdirSync(__dirname).filter(function(el) {
    var lstat;
    
    try {
        lstat = fs.lstatSync(__dirname + '/' + el);
    } catch (e) {
        return false;
    }
    
    return lstat.isDirectory();
});

var links = dirs.map(function(el) {
    return ['<a href="' + el + '">' + el + '</a>'];
});

var today = new Date();

htmlMaker(__dirname, {
    title: 'henvist.no > Nevropsykologer',
    headerRow: ['Fylker'],
    people: links,
    lastUpdate: today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear()
});