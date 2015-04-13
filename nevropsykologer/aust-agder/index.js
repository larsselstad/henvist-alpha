/*jshint node: true*/

var root = process.cwd();

var pdfToHtml = require(root + '/src/pdfToHtml');

var pathToPdf = root + "/data/Psykologer Aust-Agder telefonliste.pdf";

pdfToHtml({
    categories: {
        'Psykologi:': 'Psykologi:',
        'Nevropsykolog:': 'Nevropsykolog:'
    },
    dir: __dirname,
    pageTitle: 'Nevropsykologer i Aust-Agder',
    pagesDataKey: 'Nevropsykolog:',
    pathToPdf: pathToPdf,
    headerIndex: 1
});