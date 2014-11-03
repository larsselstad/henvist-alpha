/*jshint node: true*/

var root = process.cwd();

var pdfToHtml = require(root + '/src/pdfToHtml');

var pathToPdf = __dirname + "/Psykologer_Akershus_telefonliste.pdf";

pdfToHtml({
    categories: {
        'Psykologer:': 'Psykologer:',
        'Nevropsykologer:': 'Nevropsykologer:'
    },
    dir: __dirname,
    pageTitle: 'Psykologer i Akershus',
    pagesDataKey: 'Psykologer:',
    pathToPdf: pathToPdf,
    headerIndex: 2
});