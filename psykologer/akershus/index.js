// Script for å lage psykologer_oslo.html

/*jshint node: true*/

var root = process.cwd();

var fs = require('fs'),
    PDFParser = require("pdf2json/pdfparser"),
    pageUtil = require(root + '/src/pageUtil'),
    htmlMaker = require(root + '/src/htmlMaker');

var corrections = {
    name: {
        'nicke, Erik': 'Stänicke, Erik'
    },
    phone: {
        '2424270': '22424270',
        '2430824': '22430824',
        '2468163': '22468163',
        '2600200': '22600200',
        '2845125': '22845125',
        '2563567': '22563567',
        '2581783': '22581783',
        '2923759': '22923759',
        '2491197': '22491197',
        '689804': '21689804',
        '8174959': '48174959'
    }
};

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