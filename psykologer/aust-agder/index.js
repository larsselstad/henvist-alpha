/*jshint node: true*/

var root = process.cwd();

var pdfToHtml = require(root + '/src/pdfToHtml');

var pathToPdf = __dirname + "/Psykologer Aust-Agder telefonliste.pdf";

pdfToHtml({
    categories: {
        'Psykologi:': 'Psykologi:',
        'Nevropsykologer:': 'Nevropsykologer:'
    },
    dir: __dirname,
    pageTitle: 'Psykologer i Aust-Agder',
    pagesDataKey: 'Psykologi:',
    pathToPdf: pathToPdf,
    headerIndex: 1
});