/*jshint node: true*/

var root = process.cwd();

var pdfToHtml = require(root + '/src/pdfToHtml');

var pathToPdf = root + "/data/Psykologer Vestfold telefonliste.pdf";

pdfToHtml({
    categories: {
        'Psykologer:': 'Psykologer:',
        'Nevropsykologer:': 'Nevropsykologer:'
    },
    dir: __dirname,
    pageTitle: 'Psykologer i Vestfold',
    pagesDataKey: 'Psykologer:',
    pathToPdf: pathToPdf,
    headerIndex: 1
});