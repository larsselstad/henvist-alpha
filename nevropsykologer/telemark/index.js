/*jshint node: true*/

var root = process.cwd();

var pdfToHtml = require(root + '/src/pdfToHtml');

var pathToPdf = root + "/data/Psykologer Telemark telefonliste.pdf";

pdfToHtml({
    categories: {
        'Psykologer:': 'Psykologer:',
        'Nevropsykologer:': 'Nevropsykologer:'
    },
    dir: __dirname,
    pageTitle: 'Nevropsykologer i Telemark',
    pagesDataKey: 'Nevropsykologer:',
    pathToPdf: pathToPdf,
    headerIndex: 1
});