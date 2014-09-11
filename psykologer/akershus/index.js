// Script for å lage psykologer_oslo.html

/*jshint node: true*/

var root = process.cwd();

var fs = require('fs'),
    PDFParser = require("pdf2json/pdfparser"),
    pageUtil = require(root + '/src/pageUtil'),
    htmlMaker = require(root + '/src/htmlMaker');

var corrections = {};

var pathToPdf = __dirname + "/Psykologer_Akershus_telefonliste.pdf";

console.log(pathToPdf);

var pdfParser = new PDFParser();

// denne bør bare returnere grid
// løses med ett async/promise biblotek
pdfParser.on("pdfParser_dataReady", function (pdfData) {
    var grid = [];

    pdfData.data.Pages.forEach(function (page) {
        page.Texts.forEach(pageUtil.extractPage(grid));
    });

    var pagesData = pageUtil.extractData(grid, {
        'Psykologer:': 'Psykologer:',
        'Nevropsykologer:': 'Nevropsykologer:'
    }, corrections);

    htmlMaker(root, __dirname, 'Psykologer', pagesData['Psykologer:']);
});

pdfParser.on("pdfParser_dataError", function (data) {
    console.log('error!');
});

fs.readFile(pathToPdf, function (err, pdfBuffer) {
    if (!err) {
        pdfParser.parseBuffer(pdfBuffer);
    }
});