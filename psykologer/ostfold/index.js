/*jshint node: true*/

var root = process.cwd();

var pdfToHtml = require(root + '/src/pdfToHtml');

var pathToPdf = root + "/data/Psykologer Østfold telefonliste.pdf";

pdfToHtml({
    categories: {
        'Psykologer:': 'Psykologer:',
        'Nevropsykologer:': 'Nevropsykologer:'
    },
    dir: __dirname,
    pageTitle: 'Psykologer i Østfold',
    pagesDataKey: 'Psykologer:',
    pathToPdf: pathToPdf,
    headerIndex: 1
});