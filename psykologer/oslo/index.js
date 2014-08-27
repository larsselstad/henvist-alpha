// Script for å lage psykologer_oslo.html

/*jshint node: true*/

var root = process.cwd();

var pageUtil = require(root + '/src/pageUtil');

var fs = require('fs'),
    PDFParser = require("pdf2json/pdfparser"),
    pageUtil = require(root + '/src/pageUtil'),
    htmlMaker = require(root + '/src/htmlMaker'),
    dot = require('dot'),
    page = fs.readFileSync(root + '/src/template/page.template.html', 'utf8'),
    people = fs.readFileSync(root + '/src/template/people.template.html', 'utf8');

var pathToPdf = __dirname + "/Psykologer_Oslo_telefonliste.pdf";

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
    });

    htmlMaker(root, __dirname, pagesData['Psykologer:'], pagesData['Nevropsykologer:']);
});

pdfParser.on("pdfParser_dataError", function (data) {
    console.log('error!');
});

fs.readFile(pathToPdf, function (err, pdfBuffer) {
    if (!err) {
        pdfParser.parseBuffer(pdfBuffer);
    }
});